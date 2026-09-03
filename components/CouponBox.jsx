"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Tag, BadgeCheck, Ticket, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import {
  applyCoupon,
  clearCoupon,
  selectAppliedCoupon,
  selectCouponInput,
  selectCouponMessage,
  setCouponInput,
} from "@/store/slices/cartSlice";

const CouponBox = () => {
  const dispatch = useDispatch();
  const couponInput = useSelector(selectCouponInput);
  const appliedCoupon = useSelector(selectAppliedCoupon);
  const message = useSelector(selectCouponMessage);
  const lastToasted = useRef(null);

  useEffect(() => {
    if (!message || message === lastToasted.current) return;
    lastToasted.current = message;
    if (message.type === "success") {
      toast.success(message.text);
    } else {
      toast.error(message.text);
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(applyCoupon());
  };

  return (
    <div className="space-y-3">
      {appliedCoupon ? (
        <div className="group flex items-center justify-between rounded-2xl border border-emerald-200/50 bg-emerald-50/40 px-4 py-3 shadow-lg shadow-emerald-500/5 backdrop-blur-xl transition-all duration-500 hover:bg-emerald-50/60 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/15">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 transition-transform duration-300 group-hover:scale-110 dark:bg-emerald-500/20 dark:text-emerald-400">
              <BadgeCheck size={18} strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold tracking-tight text-emerald-900 dark:text-emerald-300">
                  {appliedCoupon.code}
                </p>
                <Sparkles size={12} className="text-emerald-500 animate-pulse" />
              </div>
              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                {appliedCoupon.label}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => dispatch(clearCoupon())}
            aria-label="Remove coupon"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-emerald-500 transition-all duration-300 hover:bg-emerald-100 hover:text-emerald-800 hover:rotate-90 active:scale-90 dark:hover:bg-emerald-500/20 dark:hover:text-emerald-300"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="group relative min-w-0 flex-1">
            <Ticket
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-emerald-500"
            />
            <input
              type="text"
              value={couponInput}
              onChange={(e) => dispatch(setCouponInput(e.target.value))}
              placeholder="Promo code"
              className="w-full rounded-xl border border-gray-200/70 bg-white/60 py-2.5 pl-10 pr-4 text-sm font-semibold uppercase tracking-widest text-gray-800 placeholder:normal-case placeholder:font-medium placeholder:tracking-normal placeholder:text-gray-400 transition-all duration-300 focus:border-emerald-400 focus:bg-white/80 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/5 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:bg-white/10"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-gray-900/20 transition-all duration-300 hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 dark:bg-white dark:text-gray-900 dark:shadow-white/10 dark:hover:bg-gray-100"
          >
            Apply
          </button>
        </form>
      )}

      {message && (
        <div
          className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold backdrop-blur-sm transition-all duration-500 ${
            message.type === "success"
              ? "border-emerald-200/50 bg-emerald-50/40 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "border-rose-200/50 bg-rose-50/40 text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full shadow-sm ${
              message.type === "success" 
                ? "bg-emerald-500 shadow-emerald-500/30" 
                : "bg-rose-500 shadow-rose-500/30"
            } animate-pulse`}
          />
          {message.text}
        </div>
      )}
    </div>
  );
};

export default CouponBox;