"use client";
import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((count) => (count < 20 ? count + 1 : count));
  };

  const decrement = () => {
    setQuantity((count) => (count > 1 ? count - 1 : count));
  };
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
      <div className="border-gray-200 rounded border p-4 bg-white">
        <p className="mb-3">
          <span className="text-sm text-gray-600">Quantity: </span>
          <span className="text-xl font-semibold">{quantity}</span>
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={decrement}
            disabled={quantity === 1}
            className={`rounded px-4 py-2 ${quantity === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
          >
            -
          </button>
          <button
            onClick={increment}
            disabled={quantity === 20}
            className={`rounded px-4 py-2 ${quantity === 20
              ? "bg-blue-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
          >
            +
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">Allowed range: 1-20</p>
      </div>
    </section>
  );
}