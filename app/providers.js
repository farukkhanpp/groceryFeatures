"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStore, loadPersistedCart } from "@/store/store";
import { hydrateCart } from "@/store/slices/cartSlice";


const Providers = ({ children }) => {
  const [store] = useState(() => makeStore());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const persisted = loadPersistedCart();
    if (persisted) {
      store.dispatch(hydrateCart(persisted));
    }
  }, [store]);

  if (!mounted) return <Provider store={store}>{children}</Provider>;

  return (
    <Provider store={store}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={1000}       
        limit={5}                
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}    
        rtl={false}
        pauseOnFocusLoss={true}  
        draggable={false}        
        pauseOnHover={true}      
        transition={Slide}
        theme="light"
        className="!top-20"      
      />
    </Provider>
  );
};

export default Providers;