"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Undo2, ShoppingBasket, Trash2, CreditCard, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import {
  clearCart,
  selectCanUndo,
  selectCartItems,
  selectLastActionLabel,
  selectSubtotal,
  undoLast,
} from "@/store/slices/cartSlice";
import { computePricing, formatCurrency } from "@/lib/pricing";
import CartItem from "./CartItem";
import CouponBox from "./CouponBox";
import DiscountProgress from "./DiscountProgress";

const CartPanel = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectSubtotal);
  const canUndo = useSelector(selectCanUndo);
  const lastActionLabel = useSelector(selectLastActionLabel);
  const appliedCoupon = useSelector((state) => state.cart.appliedCoupon);
  const [checkedOut, setCheckedOut] = useState(false);

  const pricing = computePricing(subtotal, appliedCoupon);

  const handleUndo = () => {
    if (lastActionLabel) {
      toast.info(`Undone: ${lastActionLabel}`);
    }
    dispatch(undoLast());
  };

  const handleClear = () => {
    dispatch(clearCart());
    toast.info("Basket cleared");
  };

  const handleCheckout = () => {
    setCheckedOut(true);
    toast.success("Demo checkout complete — no real order was placed");
  };

  return (
    <section id="basket" className="lg:sticky lg:top-24 lg:self-start">
      <div className="group flex max-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-3xl border border-white/30 bg-white/60 shadow-xl shadow-black/5 backdrop-blur-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 dark:border-white/10 dark:bg-gray-900/50 dark:shadow-black/30">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200/50 px-6 py-5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <ShoppingBasket size={18} strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Your Basket
            </h2>
          </div>
          
          <button
            type="button"
            disabled={!canUndo}
            onClick={handleUndo}
            title={lastActionLabel ? `Undo: ${lastActionLabel}` : "Nothing to undo"}
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-500 transition-all duration-300 enabled:hover:bg-gray-100 enabled:hover:text-gray-900 enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-400 dark:enabled:hover:bg-white/10 dark:enabled:hover:text-gray-200"
          >
            <Undo2 size={14} className="transition-transform duration-300 group-hover:-rotate-45" />
            Undo
          </button>
        </div>

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-14 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/5">
              <ShoppingBasket size={28} className="text-gray-300 dark:text-gray-600" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Your basket is empty</p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Add items from the catalog to see them here</p>
            </div>
          </div>
        ) : (
          <div className="basket-scroll flex-1 divide-y divide-gray-100 overflow-y-auto px-6 dark:divide-white/5">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="space-y-5 border-t border-gray-200/50 bg-white/40 px-6 py-5 backdrop-blur-sm dark:border-white/10 dark:bg-black/20">
          <DiscountProgress subtotal={subtotal} />

          <CouponBox />

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <dt className="font-medium">Subtotal</dt>
              <dd className="font-semibold">{formatCurrency(subtotal)}</dd>
            </div>
            {pricing.totalDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <dt className="font-medium flex items-center gap-1">
                  <Sparkles size={12} />
                  Discount
                  {pricing.effectivePercent > 0 ? ` (${pricing.effectivePercent}%)` : ""}
                </dt>
                <dd className="font-bold">-{formatCurrency(pricing.totalDiscount)}</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-200/70 pt-3 dark:border-white/10">
              <dt className="text-base font-bold text-gray-900 dark:text-gray-100">Total</dt>
              <dd className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(pricing.total)}</dd>
            </div>
          </dl>

          <div className="flex gap-3">
            <button
              type="button"
              disabled={items.length === 0}
              onClick={handleClear}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white/50 px-4 py-2.5 text-sm font-medium text-gray-600 transition-all duration-300 enabled:hover:border-rose-200 enabled:hover:bg-rose-50 enabled:hover:text-rose-600 enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:enabled:hover:bg-rose-500/10 dark:enabled:hover:text-rose-400"
            >
              <Trash2 size={14} />
              <span className="hidden sm:inline">Clear</span>
            </button>
            
            <button
              type="button"
              disabled={items.length === 0}
              onClick={handleCheckout}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-sm font-bold text-white shadow-lg shadow-gray-900/20 transition-all duration-300 enabled:hover:bg-gray-800 enabled:hover:shadow-xl enabled:hover:shadow-gray-900/30 enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98] dark:bg-white dark:text-gray-900 dark:shadow-white/10 dark:enabled:hover:bg-gray-100"
            >
              <CreditCard size={16} />
              Checkout
            </button>
          </div>

          {checkedOut && (
            <div className="rounded-xl bg-emerald-50 px-4 py-3 text-center dark:bg-emerald-500/10">
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                This is a demo — no order was placed.{" "}
                <button
                  type="button"
                  className="ml-1 font-bold underline decoration-emerald-400 underline-offset-2 transition-colors hover:text-emerald-900 dark:hover:text-emerald-300"
                  onClick={() => setCheckedOut(false)}
                >
                  Dismiss
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartPanel;