"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemSelect = (item) => {
    let cleanedName = item.name;

    cleanedName = cleanedName.split(",")[0];

    cleanedName = cleanedName.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\u24C2|\uD83E[\uDD10-\uDDFF])/g,
      "",
    );

    cleanedName = cleanedName.trim();

    setSelectedItemName(cleanedName.toLowerCase());
  };

  return (
    <main className="mx-auto max-w-5xl p-4">
      <header>
        <h1 className="mb-4 text-2xl font-bold">
          Week 8 — Shopping List + Meal Ideas
        </h1>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div>
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
