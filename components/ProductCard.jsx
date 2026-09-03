"use client";

import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Star, ShoppingBasket } from "lucide-react";
import { toast } from "react-toastify";
import { addItem, decrementQty, incrementQty, selectCartItems } from "@/store/slices/cartSlice";
import { formatCurrency } from "@/lib/pricing";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const inCart = items.find((i) => i.id === product.id);

  const handleAdd = () => {
    dispatch(addItem(product));
    toast.success(`Added "${product.title}" to your basket`);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/30 bg-white/50 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-white/50 hover:bg-white/70 hover:shadow-2xl hover:shadow-black/10 dark:border-white/10 dark:bg-gray-900/40 dark:hover:bg-gray-900/60 dark:hover:border-white/20">
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Rating Badge */}
        {typeof product.rating === "number" && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-xl bg-black/40 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md transition-all duration-300 group-hover:scale-105">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            {product.rating.toFixed(1)}
          </span>
        )}

        {/* Price Badge */}
        <span className="absolute right-3 top-3 rounded-xl bg-white/90 px-3 py-1.5 text-xs font-bold text-gray-900 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:scale-105 dark:bg-gray-800/90 dark:text-white">
          {formatCurrency(product.price)}
        </span>

        {/* In Cart Badge */}
        {inCart && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-xl bg-emerald-500/90 px-3 py-1.5 text-[11px] font-bold text-white shadow-lg shadow-emerald-500/20 backdrop-blur-md transition-all duration-300 group-hover:scale-105 animate-pulse">
            <ShoppingBasket size={12} />
            {inCart.quantity}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          {product.category.replace(/-/g, " ")}
        </p>
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-gray-900 dark:text-gray-100" title={product.title}>
          {product.title}
        </h3>

        {/* Action Row */}
        <div className="mt-auto flex items-center justify-center pt-4">
          {!inCart ? (
            <button
              type="button"
              onClick={handleAdd}
              className="w-full rounded-xl bg-gray-900 py-2.5 text-xs font-bold text-white shadow-lg shadow-gray-900/20 transition-all duration-300 ease-out hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/30 hover:-translate-y-0.5 active:scale-95 dark:bg-white dark:text-gray-900 dark:shadow-white/10 dark:hover:bg-gray-100"
            >
              Add to Basket
            </button>
          ) : (
            <div className="flex w-full items-center justify-center gap-4 rounded-xl border border-gray-200/70 bg-white/60 p-2 shadow-sm backdrop-blur-sm transition-all duration-300 dark:border-white/10 dark:bg-white/5">
              <button
                type="button"
                aria-label={`Remove one ${product.title}`}
                onClick={() => dispatch(decrementQty(product.id))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-200 ease-out hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 active:scale-90 dark:border-white/10 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
              >
                <Minus size={14} strokeWidth={2.5} />
              </button>
              <span className="min-w-[1.5rem] text-center text-base font-bold text-gray-900 dark:text-white">
                {inCart.quantity}
              </span>
              <button
                type="button"
                aria-label={`Add one more ${product.title}`}
                onClick={() => dispatch(incrementQty(product.id))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition-all duration-200 ease-out hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 active:scale-90 dark:border-white/10 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
              >
                <Plus size={14} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;