"use client";

import { useDispatch } from "react-redux";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { decrementQty, incrementQty, removeItem } from "@/store/slices/cartSlice";
import { formatCurrency } from "@/lib/pricing";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeItem(item.id));
    toast.info(`Removed "${item.title}" from your basket`);
  };

  return (
    <div className="group flex items-center gap-4 rounded-[3px] border border-slate-200/70 bg-white/70 p-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-indigo-200 hover:bg-white hover:shadow-md">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="h-12 w-12 shrink-0 rounded-[3px] border border-slate-200 object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-800" title={item.title}>
          {item.title}
        </p>
        <p className="text-xs text-slate-500">{formatCurrency(item.price)} each</p>
      </div>

      <div className="flex items-center gap-1.5 rounded-[3px] border border-indigo-200 bg-indigo-50/70 p-1 shadow-sm backdrop-blur-sm transition-all duration-300">
        <button
          type="button"
          aria-label={`Remove one ${item.title}`}
          onClick={() => dispatch(decrementQty(item.id))}
          className="flex h-6 w-6 items-center justify-center rounded-[2px] border border-indigo-300 bg-white text-indigo-700 shadow-sm transition-all duration-200 hover:border-indigo-500 hover:bg-indigo-100 active:scale-90"
        >
          <Minus size={13} strokeWidth={2.5} />
        </button>
        <span className="w-5 text-center text-sm font-semibold text-indigo-900">
          {item.quantity}
        </span>
        <button
          type="button"
          aria-label={`Add one more ${item.title}`}
          onClick={() => dispatch(incrementQty(item.id))}
          className="flex h-6 w-6 items-center justify-center rounded-[2px] border border-indigo-300 bg-white text-indigo-700 shadow-sm transition-all duration-200 hover:border-indigo-500 hover:bg-indigo-100 active:scale-90"
        >
          <Plus size={13} strokeWidth={2.5} />
        </button>
      </div>

      <button
        type="button"
        aria-label={`Remove ${item.title} from basket`}
        onClick={handleRemove}
        className="shrink-0 rounded-[3px] p-1.5 text-slate-400 transition-all duration-300 hover:bg-red-50 hover:text-red-600 active:scale-90"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default CartItem;