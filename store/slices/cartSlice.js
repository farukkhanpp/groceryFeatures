import { createSlice } from "@reduxjs/toolkit";
import { COUPONS } from "@/lib/pricing";

const MAX_HISTORY = 20;

const initialState = {
  items: [], 
  history: [], 
  couponInput: "",
  appliedCoupon: null, 
  couponMessage: null,
};

function snapshot(items) {
  return items.map((item) => ({ ...item }));
}

function pushHistory(state, label) {
  state.history.push({ label, items: snapshot(state.items) });
  if (state.history.length > MAX_HISTORY) {
    state.history.shift();
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      pushHistory(state, `Added "${product.title}"`);
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          category: product.category,
          thumbnail: product.thumbnail,
          quantity: 1,
        });
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item) return;
      pushHistory(state, `Removed "${item.title}"`);
      state.items = state.items.filter((i) => i.id !== id);
    },
    incrementQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
      pushHistory(state, `Added one more "${item.title}"`);
      item.quantity += 1;
    },
    decrementQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
      pushHistory(state, `Removed one "${item.title}"`);
      if (item.quantity <= 1) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      if (state.items.length === 0) return;
      pushHistory(state, "Cleared the basket");
      state.items = [];
    },
    undoLast: (state) => {
      const last = state.history.pop();
      if (last) {
        state.items = last.items;
      }
    },
    setCouponInput: (state, action) => {
      state.couponInput = action.payload;
    },
    applyCoupon: (state) => {
      const code = state.couponInput.trim().toUpperCase();
      if (!code) {
        state.couponMessage = { type: "error", text: "Enter a code first." };
        return;
      }
      const coupon = COUPONS[code];
      const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

      if (!coupon) {
        state.appliedCoupon = null;
        state.couponMessage = { type: "error", text: `"${code}" isn't a valid code.` };
        return;
      }
      if (subtotal < coupon.minSpend) {
        state.appliedCoupon = null;
        state.couponMessage = {
          type: "error",
          text: `Spend at least $${coupon.minSpend.toFixed(2)} to use ${code}.`,
        };
        return;
      }
      state.appliedCoupon = coupon;
      state.couponMessage = { type: "success", text: `${code} applied: ${coupon.label}.` };
    },
    clearCoupon: (state) => {
      state.appliedCoupon = null;
      state.couponMessage = null;
      state.couponInput = "";
    },
    hydrateCart: (state, action) => {
      const persisted = action.payload;
      if (!persisted || !Array.isArray(persisted.items)) return;
      state.items = persisted.items;
      state.appliedCoupon = persisted.appliedCoupon || null;
      state.couponInput = "";
      state.couponMessage = null;
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementQty,
  decrementQty,
  clearCart,
  undoLast,
  setCouponInput,
  applyCoupon,
  clearCoupon,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectSubtotal = (state) => state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
export const selectHistory = (state) => state.cart.history;
export const selectCanUndo = (state) => state.cart.history.length > 0;
export const selectLastActionLabel = (state) => {
  const h = state.cart.history;
  return h.length > 0 ? h[h.length - 1].label : null;
};
export const selectCouponInput = (state) => state.cart.couponInput;
export const selectAppliedCoupon = (state) => state.cart.appliedCoupon;
export const selectCouponMessage = (state) => state.cart.couponMessage;
