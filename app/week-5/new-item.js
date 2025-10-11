"use client";
import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("produce");

  const increment = () => {
    setQuantity((count) => (count < 20 ? count + 1 : count));
  };

  const decrement = () => {
    setQuantity((count) => (count > 1 ? count - 1 : count));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const categoryText =
      event.target.category.options[event.target.category.selectedIndex].text;

    const item = {
      name,
      quantity,
      categoryText,
    };

    console.log("New Item:", item);

    alert(
      `\nItem Name: ${name}\nQuantity: ${quantity}\nCategory: ${categoryText}`,
    );

    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded border border-gray-200 bg-white p-4"
    >
      <h2 className="mb-4 text-2xl font-bold">Week 5 — Add New Item</h2>
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Item Name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g., milk, 4 L 🥛"
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>
      <div className="rounded border border-gray-200 bg-white p-4">
        <p className="mb-3">
          <span className="text-sm text-gray-600">Quantity: </span>
          <span className="text-xl font-semibold">{quantity}</span>
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={decrement}
            disabled={quantity === 1}
            className={`rounded px-4 py-2 ${
              quantity === 1
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            -
          </button>
          <button
            type="button"
            onClick={increment}
            disabled={quantity === 20}
            className={`rounded px-4 py-2 ${
              quantity === 20
                ? "cursor-not-allowed bg-blue-200 text-gray-400"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            +
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-500">Allowed range: 1-20</p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="category" className="mb-1 block text-sm font-medium">
          Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="w-full rounded border bg-white px-3 py-2"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
      >
        Add Item
      </button>
    </form>
  );
}
