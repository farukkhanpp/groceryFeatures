"use client";

import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

export default function SearchAndFilters({
  search,
  onSearchChange,
  categories,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  resultCount,
}) {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="overflow-hidden rounded-2xl border border-white/30 bg-white/50 shadow-lg shadow-black/5 backdrop-blur-xl transition-all duration-500 hover:shadow-xl hover:shadow-black/10 dark:border-white/10 dark:bg-gray-900/40">
        
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-200/50 px-6 py-4 dark:border-white/10">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <SlidersHorizontal size={15} strokeWidth={1.5} />
          </div>
          <p className="text-sm font-bold tracking-tight text-gray-900 dark:text-gray-100">Filters</p>
        </div>

        <div className="space-y-5 p-6">
          {/* Search */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400" htmlFor="search">
              Find an item
            </label>
            <div className="group relative mt-2">
              <Search
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-emerald-500"
              />
              <input
                id="search"
                type="text"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Try 'bread' or 'apples'"
                className="w-full rounded-xl border border-gray-200/70 bg-white/60 py-2.5 pl-10 pr-4 text-sm font-medium text-gray-800 placeholder:text-gray-400 transition-all duration-300 focus:border-emerald-400 focus:bg-white/80 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:bg-white/10"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="mt-2 w-full cursor-pointer rounded-xl border border-gray-200/70 bg-white/60 px-4 py-2.5 text-sm font-medium text-gray-800 transition-all duration-300 hover:border-gray-300 hover:bg-white/80 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:hover:border-white/20 dark:hover:bg-white/10"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c.replace(/-/g, " ")}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400"
              htmlFor="sort"
            >
              <ArrowUpDown size={12} strokeWidth={2} />
              Sort by
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="mt-2 w-full cursor-pointer rounded-xl border border-gray-200/70 bg-white/60 px-4 py-2.5 text-sm font-medium text-gray-800 transition-all duration-300 hover:border-gray-300 hover:bg-white/80 focus:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:hover:border-white/20 dark:hover:bg-white/10"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>

          {/* Result count */}
          <div className="flex items-center justify-between rounded-xl border border-emerald-100/50 bg-emerald-50/40 px-4 py-3 backdrop-blur-sm transition-all duration-300 dark:border-emerald-500/10 dark:bg-emerald-500/5">
            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              <span className="font-bold">{resultCount}</span> item{resultCount === 1 ? "" : "s"} found
            </p>
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/30" />
          </div>
        </div>
      </div>
    </aside>
  );
}