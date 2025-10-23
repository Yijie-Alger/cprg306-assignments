"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };
  return (
    <main className="mx-auto max-w-xl space-y-4 p-4">
      <header>
        <h1 className="mb-3 text-2xl font-bold">Week 7 — Shopping List</h1>
      </header>
      <div className="space-y-4">
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} />
      </div>
    </main>
  );
}
