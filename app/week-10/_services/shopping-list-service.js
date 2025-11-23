import { db } from "@/app/utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";

export async function getItems(userId) {
  if (!userId) return [];

  try {
    const itemsRef = collection(db, "users", userId, "items");
    const q = query(itemsRef);

    const querySnapshot = await getDocs(q);
    const items = [];

    querySnapshot.forEach((doc) => {
      items.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
}

export async function addItem(userId, item) {
  if (!userId || !item) return null;

  try {
    const itemsRef = collection(db, "users", userId, "items");

    const docRef = await addDoc(itemsRef, item);

    return docRef.id;
  } catch (error) {
    console.error("Error adding item:", error);
    return null;
  }
}

export async function deleteItem(userId, itemId) {
  try {
    const itemRef = doc(db, "users", userId, "items", itemId);

    await deleteDoc(itemRef);
  } catch (error) {
    console.error("Error in deleteItem service:", error);
    throw error;
  }
}
