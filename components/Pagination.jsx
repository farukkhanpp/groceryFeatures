"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

function getPageNumbers(current, total) {
  const pages = new Set([1, total, current, current - 1, current + 1]);
  return Array.from(pages)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Product pages" className="mt-8 flex items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-slate-200 bg-white text-slate-500 transition-all duration-200 enabled:hover:border-slate-400 enabled:hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
      >
        <ChevronLeft size={16} />
      </button>

      {pageNumbers.map((page, idx) => {
        const prevPage = pageNumbers[idx - 1];
        const showEllipsis = prevPage && page - prevPage > 1;
        return (
          <span key={page} className="flex items-center gap-1.5">
            {showEllipsis && <span className="px-1 text-sm text-slate-400">…</span>}
            <button
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`flex h-9 min-w-9 items-center justify-center rounded-[3px] border px-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
                page === currentPage
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900"
              }`}
            >
              {page}
            </button>
          </span>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-[3px] border border-slate-200 bg-white text-slate-500 transition-all duration-200 enabled:hover:border-slate-400 enabled:hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}