import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useAuth } from "../../../hooks/useAuth.js";
import { db } from "../../../config/firebase.js";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import uuid from "react-native-uuid";

const FoodLogContext = createContext();

export function useFoodLog() {
  return useContext(FoodLogContext);
}

export function FoodLogProvider({ children }) {
  const defaultMealSections = Array(6)
    .fill(null)
    .map((_, index) => ({
      id: `Meal ${index + 1}`,
      name: index < 3 ? ["Breakfast", "Lunch", "Dinner"][index] : "",
    }));

  const [mealSections, setMealSections] = useState(defaultMealSections);

  const initialFoodEntries = Object.fromEntries(
    mealSections.map((section) => [section.id, []])
  );

  const [foodEntries, setFoodEntries] = useState(initialFoodEntries);

  const { user } = useAuth(); // If you're using an authentication context

  console.log("Meal Sections: ", mealSections);
  console.log("Food Entries: ", foodEntries);

  /** FOOD ENTRY METHODS **/

  // Function to save a food log entry
  const saveFoodLogEntry = (
    mealType,
    newFoodName,
    newFoodCalories,
    selectedDate
  ) => {
    // Ensure that the meal section is valid
    if (mealSections.some((section) => section.id === mealType)) {
      // Generate a unique ID
      const uniqueId = `${uuid.v4()}_${selectedDate}`;

      // Create a new entry
      const newEntry = {
        id: uniqueId,
        foodName: newFoodName,
        foodCalories: newFoodCalories,
        date: selectedDate,
      };

      // Update the local state with the new entry
      setFoodEntries((prevEntries) => ({
        ...prevEntries,
        [mealType]: [...prevEntries[mealType], newEntry],
      }));
    }
  };

  // Function to delete a food entry
  const deleteFoodEntry = (mealType, entryId) => {
    // Delete a specific food entry from the specified meal type and date
    // Update the foodEntries state
    const updatedEntries = { ...foodEntries };

    updatedEntries[mealType] = updatedEntries[mealType].filter((entry) => {
      return entry.id !== entryId;
    });

    setFoodEntries(updatedEntries);
  };

  // Function to edit a food entry
  const editFoodEntry = (mealType, entryId, updatedEntry) => {
    // Edit a food entry in the specified meal type
    // Update the foodEntries state
    const updatedEntries = { ...foodEntries };
    updatedEntries[mealType] = updatedEntries[mealType].map((entry) => {
      if (entry.id === entryId) {
        return updatedEntry;
      }
      return entry;
    });
    setFoodEntries(updatedEntries);
  };

  const contextValue = useMemo(() => {
    return {
      mealSections,
      setMealSections,
      foodEntries,
      setFoodEntries,
      saveFoodLogEntry,
      deleteFoodEntry,
      editFoodEntry,
    };
  }, [
    mealSections,
    setMealSections,
    foodEntries,
    setFoodEntries,
    saveFoodLogEntry,
    deleteFoodEntry,
    editFoodEntry,
  ]);

  return (
    <FoodLogContext.Provider value={contextValue}>
      {children}
    </FoodLogContext.Provider>
  );
}
