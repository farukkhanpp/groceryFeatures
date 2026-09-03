"use client";

import SkeletonCard from "@/skeleton/skeleton";
import ProductCard from "./ProductCard";

const ProductGrid = ({ status, error, products, onRetry }) => {
  if (status === "loading" || status === "idle") {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[3px] border border-slate-200 bg-white p-10 text-center transition-all duration-300">
        <p className="text-sm text-slate-700">Couldn&apos;t load the catalog: {error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="rounded-[3px] bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-slate-800 active:scale-95"
        >
          Try again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-[3px] border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 transition-all duration-300">
        No items match your search. Try a different keyword or category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;