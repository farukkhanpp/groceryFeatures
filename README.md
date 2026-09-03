 — Grocery Basket

A Next.js 16 (App Router) grocery shopping app with a Redux Toolkit-powered
basket: live pricing, threshold discounts, promo codes, search/filter/sort,
localStorage persistence, and undo for the last basket action.

 
Open http://localhost:3000. 


api/                     Global, reusable API layer
  axiosClient.js         Single shared axios instance (baseURL: dummyjson.com)
  products.js             fetchAllProducts() -> GET /products

store/
  store.js                Redux store factory + localStorage persistence for the cart
  slices/
    cartSlice.js          Cart items, undo history, coupon state + selectors
    productsSlice.js      Product catalog fetch (createAsyncThunk) + selectors

lib/
  pricing.js               Discount tiers, coupon definitions, price math

components/
  Header.js                Sticky header with basket chip
  SearchAndFilters.js      Search input, category filter, sort dropdown
  ProductGrid.js            Grid + loading skeletons + empty/error states
  ProductCard.js             Single product card (add / quantity stepper)
  CartPanel.js               Basket panel: items, discount, coupon, undo, totals
  CartItem.js                 Single basket line item
  CouponBox.js                Promo code input + applied coupon chip
  DiscountProgress.js        Progress bar toward the next automatic discount

app/
  layout.js                Root layout
  providers.js              Redux <Provider> wrapper (client component)
  page.js                    Home page: wires products, filters and the basket together
  globals.css               Tailwind import + design tokens
```

## Features

- **Product catalog** — fetched live from `https://dummyjson.com/products`
  via Axios, on mount, with loading skeletons and a retry button on failure.
- **Basket** — add/remove items, +/- quantity steppers; the subtotal and
  totals recompute instantly from Redux state.
- **Automatic discounts** — a percentage discount unlocks once the subtotal
  crosses a threshold (see `lib/pricing.js`), with a live progress bar
  showing how much more to add for the next tier.
- **Promo codes** — try `FRESH10`, `MEGA20` (min $100), or `FLAT15` (min $40).
  Codes are validated against minimum spend and give the shopper whichever
  is better: the coupon percentage or the automatic tier percentage, plus
  any flat coupon amount.
- **Search, filter, sort** — filter by category, search by name, sort by
  price (asc/desc), all combinable.
- **Undo last action** — every add, remove, quantity change, or "clear
  basket" pushes a snapshot onto a history stack; the Undo button in the
  basket header reverts the most recent one.
- **Persistence** — the basket (items, coupon) is saved to `localStorage`
  on every change and restored on reload.

## Notes

Created By Faruk.dev