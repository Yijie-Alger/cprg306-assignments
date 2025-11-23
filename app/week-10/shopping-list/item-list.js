"use client";

import { useState } from "react";
import Item from "./item";

export default function ItemList({ items, onItemSelect, onItemDelete }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <button
          onClick={() => setSortBy("name")}
          className={`cursor-pointer rounded px-3 py-1 text-sm ${
            sortBy === "name"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
          }`}
        >
          Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`cursor-pointer rounded px-3 py-1 text-sm ${
            sortBy === "category"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
          }`}
        >
          Category
        </button>
      </div>
      <ul className="space-y-2">
        {sortedItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded bg-slate-50 p-2 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <div className="flex-1">
              <Item
                name={item.name}
                quantity={item.quantity}
                category={item.category}
                onSelect={() => onItemSelect(item)}
              />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onItemDelete(item.id);
              }}
              className="ml-4 cursor-pointer rounded bg-red-500 px-3 py-1 text-sm text-white transition-colors hover:bg-red-600"
              title="Delete Item"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
