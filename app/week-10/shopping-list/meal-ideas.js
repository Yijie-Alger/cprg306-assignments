"use client";

import { useState, useEffect } from "react";

async function fetchMealIdeas(ingredient) {
  if (!ingredient) return [];

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    );

    if (!response.ok) {
      console.error("Failed to fetch meal ideas");
      return [];
    }

    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadMealIdeas() {
      if (!ingredient) {
        setMeals([]);
        return;
      }

      setLoading(true);
      const fetchedMeals = await fetchMealIdeas(ingredient);
      setMeals(fetchedMeals);
      setLoading(false);
    }

    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="rounded-md border border-gray-300 bg-white p-4 text-gray-800 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100">
      <h2 className="mb-3 text-xl font-semibold">
        Meal Ideas {ingredient ? `for "${ingredient}"` : ""}
      </h2>
      {!ingredient ? (
        <p className="text-gray-500">Select an ingredient to see meal ideas.</p>
      ) : loading ? (
        <p className="text-gray-500">Loading meal ideas...</p>
      ) : meals.length === 0 ? (
        <p className="text-gray-500">No meal ideas found for “{ingredient}”.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="cursor-pointer rounded border border-gray-300 p-2 text-sm transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              {meal.strMeal}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
