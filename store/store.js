import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productsReducer from "./slices/productsSlice";

export const CART_STORAGE_KEY = "grocery-app.cart.v1";

export function loadPersistedCart(){
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if(!raw) return undefined;
    const parsed = JSON.parse(raw);

    if (!parsed || !Array.isArray(parsed.items)) return undefined;
    return parsed;
  } catch {
    return undefined;
  }
}

function persistCart(cartState) {
  if(typeof window === "undefined") return;
  try{
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
  } 
  catch{
   
  }
}

export function makeStore() {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      products: productsReducer,
    },
  });

  if(typeof window !== "undefined"){
    let previousCart = store.getState().cart;
    store.subscribe(() => {
      const nextCart = store.getState().cart;
      if (nextCart !== previousCart){
        previousCart = nextCart;
        persistCart(nextCart);
      }
    });
  }

  return store;
}
