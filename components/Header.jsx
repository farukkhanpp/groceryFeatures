"use client";

import { useSelector } from "react-redux";
import { ShoppingBasket, Wheat } from "lucide-react";
import { selectCartCount, selectSubtotal } from "@/store/slices/cartSlice";
import { formatCurrency } from "@/lib/pricing";

const Header = () => {
  const count = useSelector(selectCartCount);
  const subtotal = useSelector(selectSubtotal);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      {/* Glassmorphism container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/20 bg-white/70 px-5 py-3 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-black/40 dark:shadow-black/20">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 dark:bg-emerald-500/20 dark:text-emerald-400">
              <Wheat size={20} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 transition-colors dark:text-gray-100">
                Field & Pantry
              </h1>
              <p className="text-[11px] font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Fresh picks, priced fairly
              </p>
            </div>
          </div>

          {/* Basket Button */}
          <a
            href="#basket"
            className="group relative flex items-center gap-3 rounded-xl bg-gray-900 px-5 py-2.5 text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-800 active:scale-95 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            <span className="relative">
              <ShoppingBasket 
                size={18} 
                strokeWidth={1.5} 
                className="transition-transform duration-300 group-hover:-rotate-12" 
              />
              {count > 0 && (
                <span className="absolute -right-2.5 -top-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white animate-bounce shadow-sm">
                  {count}
                </span>
              )}
            </span>
            
            <span className="hidden text-sm font-medium sm:inline">
              {count === 0 ? "Your Basket" : formatCurrency(subtotal)}
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;