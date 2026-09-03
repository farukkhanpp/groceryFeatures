"use client";

import { getNextTier, getTierDiscountPercent, formatCurrency } from "@/lib/pricing";

const DiscountProgress = ({ subtotal }) => {
  const currentPercent = getTierDiscountPercent(subtotal);
  const next = getNextTier(subtotal);

  if(!next){
    return (
      <div className="rounded-[3px] bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 transition-all duration-300">
        {currentPercent}% basket discount unlocked — nice haul.
      </div>
    );
  }

  const progress = Math.min(100, Math.round((subtotal / next.threshold) * 100));
  const remaining = Math.max(0, next.threshold - subtotal);

  return (
    <div className="rounded-[3px] border border-slate-200 bg-white px-3 py-2.5 transition-all duration-300">
      <p className="text-xs text-slate-500">
        {subtotal === 0
          ? `Spend ${formatCurrency(next.threshold)} to unlock ${next.percent}% off.`
          : `Add ${formatCurrency(remaining)} more to unlock ${next.percent}% off${
              currentPercent ? ` (up from ${currentPercent}%)` : ""
            }.`}
      </p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-slate-800 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default DiscountProgress;