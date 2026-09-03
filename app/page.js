"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Leaf, Package, Layers, ArrowDown, Sun, Moon } from "lucide-react";
import {
  loadProducts,
  selectCategories,
  selectProductError,
  selectProductItems,
  selectProductStatus,
} from "@/store/slices/productsSlice";
import Header from "@/components/Header";
import SearchAndFilters from "@/components/SearchAndFilters";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import CartPanel from "@/components/CartPanel";

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const dispatch = useDispatch();
  const status = useSelector(selectProductStatus);
  const error = useSelector(selectProductError);
  const products = useSelector(selectProductItems);
  const categories = useSelector(selectCategories);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastFilterKey, setLastFilterKey] = useState(`${search}|${category}|${sortBy}`);
  
  // Theme Toggle State
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = saved ? saved === "dark" : prefersDark;
    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const filtered = useMemo(() => {
    let list = products;

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, category, search, sortBy]);

  const filterKey = `${search}|${category}|${sortBy}`;
  if (filterKey !== lastFilterKey) {
    setLastFilterKey(filterKey);
    setCurrentPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById("catalog-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-gray-50 transition-colors duration-500 dark:bg-gray-950">
      
      {/* Ambient Background Blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl transition-colors duration-500 dark:bg-emerald-500/10" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl transition-colors duration-500 dark:bg-amber-500/10" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-rose-400/10 blur-3xl transition-colors duration-500 dark:bg-rose-500/10" />
      </div>

      <Header />

      {/* Hero Section */}
      <section className="relative border-b border-gray-200/50 bg-white/30 backdrop-blur-3xl transition-colors duration-500 dark:border-white/5 dark:bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-16">
          
          {/* Left Content */}
          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/50 bg-emerald-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700 backdrop-blur-sm transition-colors duration-300 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Leaf size={12} className="animate-pulse" />
              Restocked daily
            </div>
            
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl transition-colors duration-300 dark:text-white">
              This week&apos;s{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                  fresh picks
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8C50 2 150 2 198 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-emerald-400/40 dark:text-emerald-500/30" />
                </svg>
              </span>
            </h1>
            
            <p className="mt-4 max-w-lg text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Search the shelves, build your basket, and watch the discount unlock as your total grows. 
              Freshness guaranteed with every order.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500">
              <ArrowDown size={14} className="animate-bounce" />
              Scroll to explore
            </div>
          </div>

          {/* Right Side - Stats + Theme Toggle */}
          <div className="flex flex-col items-end gap-5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="group relative flex h-11 w-20 items-center rounded-full border border-gray-200/60 bg-white/50 p-1 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-500 hover:shadow-xl dark:border-white/10 dark:bg-gray-800/50"
              aria-label="Toggle dark mode"
            >
              <div
                className={`absolute left-1 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-all duration-500 dark:bg-gray-700 ${
                  isDark ? "translate-x-9" : "translate-x-0"
                }`}
              >
                {isDark ? (
                  <Moon size={16} className="text-indigo-400 transition-transform duration-500 group-hover:rotate-12" />
                ) : (
                  <Sun size={16} className="text-amber-500 transition-transform duration-500 group-hover:rotate-45" />
                )}
              </div>
              <span className={`absolute text-[10px] font-bold uppercase tracking-wider transition-opacity duration-300 ${isDark ? "left-2.5 opacity-100" : "left-2.5 opacity-0"}`}>
                Dark
              </span>
              <span className={`absolute right-2.5 text-[10px] font-bold uppercase tracking-wider transition-opacity duration-300 ${!isDark ? "opacity-100" : "opacity-0"}`}>
                Light
              </span>
            </button>

            {/* Stats Cards */}
            <div className="flex gap-4 lg:gap-5">
              <div className="group flex flex-col items-center rounded-2xl border border-white/40 bg-white/40 p-6 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/60 hover:shadow-xl dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover:scale-110 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <Package size={22} strokeWidth={1.5} />
                </div>
                <p className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  {products.length}
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Items in stock
                </p>
              </div>

              <div className="group flex flex-col items-center rounded-2xl border border-white/40 bg-white/40 p-6 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/60 hover:shadow-xl dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 transition-transform duration-300 group-hover:scale-110 dark:bg-amber-500/20 dark:text-amber-400">
                  <Layers size={22} strokeWidth={1.5} />
                </div>
                <p className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  {categories.length}
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="catalog-top" className="relative mx-auto w-full max-w-7xl flex-1 scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr_340px]">
          <SearchAndFilters
            search={search}
            onSearchChange={setSearch}
            categories={categories}
            category={category}
            onCategoryChange={setCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            resultCount={filtered.length}
          />

          <div className="space-y-6">
            <ProductGrid
              status={status}
              error={error}
              products={paginated}
              onRetry={() => dispatch(loadProducts())}
            />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>

          <CartPanel />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-gray-200/50 bg-white/30 px-4 py-8 text-center backdrop-blur-xl transition-colors duration-500 dark:border-white/5 dark:bg-black/20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 flex items-center justify-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Promo Codes Available
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["FRESH10", "MEGA20", "FLAT15"].map((code) => (
              <span
                key={code}
                className="inline-flex items-center rounded-lg border border-gray-200/60 bg-white/50 px-3 py-1.5 text-xs font-bold text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
              >
                {code}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-gray-400 dark:text-gray-600">
              Made By Faruk
          </p>
        </div>
      </footer>
    </div>
  );
}