"use client";

import { useEffect, useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import {
  getItems,
  addItem,
  deleteItem,
} from "../_services/shopping-list-service";

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();

  const [loadingLogout, setLoadingLogout] = useState(false);

  const router = useRouter();

  const [selectedItemName, setSelectedItemName] = useState("");

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/week-10");
      return;
    }

    const loadItems = async () => {
      try {
        const items = await getItems(user.uid);
        setItems(items);
      } catch (error) {
        console.error("Error loading items:", error);
      }
    };

    loadItems();
  }, [user, router]);

  const handleLogout = async () => {
    try {
      setLoadingLogout(true);
      await firebaseSignOut();
      router.push("/week-10");
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

  const handleAddItem = async (newItem) => {
    if (!user) return;

    try {
      const docId = await addItem(user.uid, newItem);

      const itemWithId = { ...newItem, id: docId };

      setItems((prevItems) => [...prevItems, itemWithId]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
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

  const handleDeleteItem = async (itemId) => {
    if (!user) return;
    try {
      await deleteItem(user.uid, itemId);

      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <main className="mx-auto max-w-5xl p-4">
      <header>
        <h1 className="mb-4 text-2xl font-bold">
          Week 10 — Shopping List + Meal Ideas
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Logged in as{" "}
              <span className="font-semibold">{user.displayName}</span>
            </p>
            <button
              onClick={handleLogout}
              disabled={loadingLogout}
              className="cursor-pointer rounded bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600"
            >
              {loadingLogout ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </h1>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <NewItem onAddItem={handleAddItem} />
          <ItemList
            items={items}
            onItemSelect={handleItemSelect}
            onItemDelete={handleDeleteItem}
          />
        </div>
        <div>
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
