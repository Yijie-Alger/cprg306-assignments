"use client";

import { useEffect, useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();

  const [loadingLogout, setLoadingLogout] = useState(false);

  const router = useRouter();

  const [items, setItems] = useState(itemsData);

  const [selectedItemName, setSelectedItemName] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/week-9");
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      setLoadingLogout(true);
      await firebaseSignOut();
      router.push("/week-9");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoadingLogout(false);
    }
  };

  if (!user) {
    return (
      <main className="p-6 text-center text-gray-700 dark:text-gray-300">
        <p>Redirecting to login page...</p>
      </main>
    );
  }

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
          Week 9 — Shopping List + Meal Ideas
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Logged in as{" "}
              <span className="font-semibold">{user.displayName}</span>
            </p>
            <button
              onClick={handleLogout}
              disabled={loadingLogout}
              className="rounded bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600"
            >
              {loadingLogout ? "Signing out..." : "Sign Out"}
            </button>
          </div>
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
