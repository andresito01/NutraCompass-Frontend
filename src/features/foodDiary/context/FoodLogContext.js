import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  addDoc,
  deleteDoc,
  collection,
  doc,
  updateDoc,
  getDocs,
  setDoc,
  serverTimestamp,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../../../authentication/context/AuthContext.js";
import { db } from "../../../config/firebase.js";
// import uuid from "react-native-uuid";

const FoodLogContext = createContext();

export function useFoodLog() {
  return useContext(FoodLogContext);
}

export function FoodLogProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.uid;

  const [mealSections, setMealSections] = useState([]);
  const [foodEntries, setFoodEntries] = useState({});
  const customMealSectionsCollectionRef = collection(
    db,
    `users/${userId}/customMealSections`
  );

  /** Note: These console logs are being executed everytime I change the theme of the app */
  console.log("Meal Sections: ", mealSections);
  console.log("Food Entries: ", foodEntries);

  useEffect(() => {
    const initializeData = async () => {
      await initializeFirestoreWithInitialMealSections();
      await loadMealSectionCustomizations();
    };

    if (user) {
      initializeData();
    }
  }, [user]);

  useEffect(() => {
    if (mealSections.length > 0) {
      loadFoodEntries();
    }
  }, [mealSections]);

  /** MEAL NAME INITIALIZATION AND CUSTOMIZATION METHODS  **/

  // Function to initialize Firestore with initial meal sections
  const initializeFirestoreWithInitialMealSections = async () => {
    try {
      const querySnapshot = await getDocs(customMealSectionsCollectionRef);
      if (querySnapshot.empty) {
        const batch = [];
        const initialMealSections = Array(6)
          .fill(null)
          .map((_, index) => ({
            id: `Meal ${index + 1}`,
            name: index < 3 ? ["Breakfast", "Lunch", "Dinner"][index] : "",
          }));

        for (let index = 0; index < initialMealSections.length; index++) {
          const mealSection = initialMealSections[index];
          const mealSectionDocRef = doc(
            customMealSectionsCollectionRef,
            mealSection.id
          );
          batch.push(setDoc(mealSectionDocRef, mealSection));
        }

        await Promise.all(batch);
      }
    } catch (error) {
      console.error("Error creating initial customMealSections:", error);
    }
  };

  // Function to load meal section customizations from Firestore and update the local state
  const loadMealSectionCustomizations = async () => {
    try {
      const querySnapshot = await getDocs(customMealSectionsCollectionRef);
      const customMealSections = [];

      querySnapshot.forEach((doc) => {
        customMealSections.push({
          id: doc.id,
          name: doc.data().name || "",
        });
      });

      setMealSections(customMealSections);
    } catch (error) {
      console.error("Error loading meal section customizations:", error);
    }
  };

  // Function to update Firestore with multiple meal section name changes
  const updateMealSectionNames = async (mealSectionUpdates) => {
    const batch = writeBatch(db); // Create a batch

    mealSectionUpdates.forEach((update) => {
      const mealSectionDocRef = doc(
        customMealSectionsCollectionRef,
        update.mealSectionId
      );
      const updateData = { name: update.newName };
      batch.update(mealSectionDocRef, updateData);
    });

    try {
      await batch.commit();
      // Update the local state with the changes
      setMealSections((prevSections) =>
        prevSections.map((section) => {
          const matchingUpdate = mealSectionUpdates.find(
            (update) => update.mealSectionId === section.id
          );
          if (matchingUpdate) {
            return { ...section, name: matchingUpdate.newName };
          }
          return section;
        })
      );
    } catch (error) {
      console.error("Error updating meal section names in Firestore:", error);
    }
  };

  /** FOOD ENTRY METHODS **/

  // Load food entries for all meal sections
  const loadFoodEntries = async () => {
    // Check if there are valid meal sections
    if (mealSections.length === 0) {
      console.error("No meal sections available.");
      return;
    }

    const foodLogEntriesCollectionRef = collection(
      db,
      `users/${userId}/foodLogEntries`
    );

    try {
      const updatedEntries = {};

      for (const section of mealSections) {
        const mealType = section.id;

        const querySnapshot = await getDocs(
          query(foodLogEntriesCollectionRef, where("mealType", "==", mealType))
        );

        const entries = [];

        querySnapshot.forEach((doc) => {
          entries.push({ id: doc.id, ...doc.data() });
        });

        // Create a shallow copy of the previous state
        updatedEntries[mealType] = entries;
      }

      // Update the local state with the loaded entries for all meal sections
      setFoodEntries(updatedEntries);
    } catch (error) {
      console.error("Error loading food entries:", error);
      // Handle the error gracefully, e.g., show a message to the user
    }
  };

  // Load food entries for a specific meal section
  const loadFoodEntriesForSpecificMealType = async (mealType) => {
    console.log(mealType);
    // Check if the mealType is valid
    if (!mealSections.some((section) => section.id === mealType)) {
      console.error("Invalid mealType:", mealType);
      return;
    }

    const foodLogEntriesCollectionRef = collection(
      db,
      `users/${userId}/foodLogEntries`
    );

    try {
      const querySnapshot = await getDocs(
        query(foodLogEntriesCollectionRef, where("mealType", "==", mealType))
      );

      const entries = [];

      querySnapshot.forEach((doc) => {
        entries.push({ id: doc.id, ...doc.data() });
      });

      // Update the local state with the loaded entries
      setFoodEntries((prevEntries) => {
        // Create a shallow copy of the previous state
        const updatedEntries = { ...prevEntries };

        // Check if the mealType exists in the previous state; if not, initialize it as an empty array
        if (!updatedEntries[mealType]) {
          updatedEntries[mealType] = [];
        }

        // Add the new entry to the mealType array
        updatedEntries[mealType].push({ id: docRef.id, ...newEntry });

        return updatedEntries;
      });
    } catch (error) {
      console.error("Error loading food entries:", error);
      // Handle the error gracefully, e.g., show a message to the user
    }
  };

  // Function to save a food log entry
  const saveFoodLogEntry = async (
    mealType,
    newFoodName,
    newFoodCalories,
    selectedDate
  ) => {
    // Ensure that the meal section is valid
    if (mealSections.some((section) => section.id === mealType)) {
      try {
        // Create a new entry object
        const newEntry = {
          foodName: newFoodName,
          foodCalories: newFoodCalories,
          mealType: mealType,
          date: selectedDate,
          timestamp: serverTimestamp(),
        };

        const foodLogEntriesCollectionRef = collection(
          db,
          "users/" + userId + "/foodLogEntries"
        );

        // Add the entry to firestore
        const docRef = await addDoc(foodLogEntriesCollectionRef, newEntry);

        // Update the local state with the new entry
        setFoodEntries((prevEntries) => {
          // Create a shallow copy of the previous state
          const updatedEntries = { ...prevEntries };

          // Check if the mealType exists in the previous state; if not, initialize it as an empty array
          if (!updatedEntries[mealType]) {
            updatedEntries[mealType] = [];
          }

          // Add the new entry to the mealType array
          updatedEntries[mealType].push({ id: docRef.id, ...newEntry });

          return updatedEntries;
        });
      } catch (error) {
        console.error("Error saving food log entry:", error);
      }
    }
  };

  // Function to delete a food entry
  const deleteFoodEntry = async (mealType, entryId) => {
    try {
      const foodLogEntriesCollectionRef = collection(
        db,
        "users/" + userId + "/foodLogEntries"
      );
      const entryDocRef = doc(foodLogEntriesCollectionRef, entryId);

      // Delete the entry from Firestore
      await deleteDoc(entryDocRef);

      // Update the local state
      const updatedEntries = { ...foodEntries };
      updatedEntries[mealType] = updatedEntries[mealType].filter(
        (entry) => entry.id !== entryId
      );
      setFoodEntries(updatedEntries);
    } catch (error) {
      console.error("Error deleting food log entry:", error);
    }
  };

  // Function to edit a food entry
  // const editFoodEntry = async (mealType, entryId, updatedEntry) => {
  //   try {
  //     const foodLogEntriesCollectionRef = collection(
  //       db,
  //       "users/" + userId + "/foodLogEntries"
  //     );
  //     const entryDocRef = doc(foodLogEntriesCollectionRef, entryId);

  //     // Update the entry in Firestore
  //     await setDoc(entryDocRef, updatedEntry, { merge: true });

  //     // Update the local state
  //     const updatedEntries = { ...foodEntries };
  //     updatedEntries[mealType] = updatedEntries[mealType].map((entry) =>
  //       entry.id === entryId ? { ...entry, ...updatedEntry } : entry
  //     );
  //     setFoodEntries(updatedEntries);
  //   } catch (error) {
  //     console.error("Error editing food log entry:", error);
  //   }
  // };

  const contextValue = useMemo(() => {
    return {
      mealSections,
      setMealSections,
      foodEntries,
      setFoodEntries,
      loadMealSectionCustomizations,
      updateMealSectionNames,
      saveFoodLogEntry,
      deleteFoodEntry,
      //editFoodEntry,
    };
  }, [
    mealSections,
    setMealSections,
    foodEntries,
    setFoodEntries,
    loadMealSectionCustomizations,
    updateMealSectionNames,
    saveFoodLogEntry,
    deleteFoodEntry,
    //editFoodEntry,
  ]);

  return (
    <FoodLogContext.Provider value={contextValue}>
      {children}
    </FoodLogContext.Provider>
  );
}
