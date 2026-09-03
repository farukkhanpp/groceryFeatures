
export const DISCOUNT_TIERS = [
  { threshold: 120, percent: 15 },
  { threshold: 70, percent: 10 },
  { threshold: 35, percent: 5 },
];

export const COUPONS = {
  FRESH10: {
    code: "FRESH10",
    type: "percent",
    value: 10,
    minSpend: 0,
    label: "10% off your basket",
  },
  MEGA20: {
    code: "MEGA20",
    type: "percent",
    value: 20,
    minSpend: 100,
    label: "20% off orders over $100",
  },
  FLAT15: {
    code: "FLAT15",
    type: "flat",
    value: 15,
    minSpend: 40,
    label: "$15 off orders over $40",
  },
};

export function getTierDiscountPercent(subtotal) {
  const tier = DISCOUNT_TIERS.find((t) => subtotal >= t.threshold);
  return tier ? tier.percent : 0;
}

export function getNextTier(subtotal) {
  const upcoming = [...DISCOUNT_TIERS]
    .sort((a, b) => a.threshold - b.threshold)
    .find((t) => subtotal < t.threshold);
  return upcoming || null;
}

export function computePricing(subtotal, appliedCoupon) {
  const tierPercent = getTierDiscountPercent(subtotal);
  const couponPercent = appliedCoupon?.type === "percent" ? appliedCoupon.value : 0;
  const couponFlat = appliedCoupon?.type === "flat" ? appliedCoupon.value : 0;

  const effectivePercent = Math.max(tierPercent, couponPercent);
  const percentAmount = (subtotal * effectivePercent) / 100;
  const totalDiscount = Math.min(subtotal, percentAmount + couponFlat);
  const total = Math.max(0, subtotal - totalDiscount);

  return {
    subtotal,
    tierPercent,
    couponPercent,
    couponFlat,
    effectivePercent,
    totalDiscount,
    total,
  };
}

export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}
