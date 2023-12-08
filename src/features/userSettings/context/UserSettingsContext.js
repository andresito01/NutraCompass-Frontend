// UserSettingsContext.js

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useAuth } from "../../../authentication/context/AuthContext.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../config/firebase.js";

const UserSettingsContext = createContext();

export function useUserSettings() {
  return useContext(UserSettingsContext);
}

export function UserSettingsProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.uid;
  const [userSettings, setUserSettings] = useState(null);

  // Method to calculate total daily calorie carbs goal based on percentage of the total daily calories
  const calculateCarbDailyCalories = (totalDailyCalories, carbPercentage) => {
    return Math.round((totalDailyCalories * carbPercentage) / 100);
  };

  // Method to calculate total daily calorie protein goal based on percentage of the total daily calories
  const calculateProteinDailyCalories = (
    totalDailyCalories,
    proteinPercentage
  ) => {
    return Math.round((totalDailyCalories * proteinPercentage) / 100);
  };

  // Method to calculate total daily calorie fat goal based on percentage of the total daily calories
  const calculateFatDailyCalories = (totalDailyCalories, fatPercentage) => {
    return Math.round((totalDailyCalories * fatPercentage) / 100);
  };

  const calculateCarbDailyGrams = (totalDailyCalories, carbPercentage) => {
    const carbCaloriesPerGram = 4;
    return Math.round(
      (totalDailyCalories * (carbPercentage / 100)) / carbCaloriesPerGram
    );
  };

  const calculateProteinDailyGrams = (
    totalDailyCalories,
    proteinPercentage
  ) => {
    const proteinCaloriesPerGram = 4;
    return Math.round(
      (totalDailyCalories * (proteinPercentage / 100)) / proteinCaloriesPerGram
    );
  };

  const calculateFatDailyGrams = (totalDailyCalories, fatPercentage) => {
    const fatCaloriesPerGram = 9;
    return Math.round(
      (totalDailyCalories * (fatPercentage / 100)) / fatCaloriesPerGram
    );
  };

  // Fetch user settings from Firestore when the component mounts
  useEffect(() => {
    const fetchUserSettings = async () => {
      if (userId) {
        const userSettingsDocRef = doc(db, `users/${userId}/settings`, userId);
        const userSettingsDoc = await getDoc(userSettingsDocRef);

        if (userSettingsDoc.exists()) {
          setUserSettings(userSettingsDoc.data());
        } else {
          // If user settings document doesn't exist, initialize with default values
          const defaultSettings = {
            profile: {
              firstName: user?.firstName || "Default First Name",
              lastName: user?.lastName || "Default Last Name",
              email: user.email || "Default Email",
              phoneNumber: user.phoneNumber || "Default Phone Number",
              emergencyContact:
                user.emergencyContact || "Default Emergency Contact",
            },
            appAppearance: {
              theme: "dark", // Default to dark theme
            },
            nutritionalGoals: {
              calorieGoal: 2000,
              macroGoals: {
                carb: {
                  dailyPercentage: 0.4,
                  dailyCalories: calculateCarbDailyCalories(2000, 40),
                  dailyGrams: calculateCarbDailyGrams(2000, 40),
                },
                protein: {
                  dailyPercentage: 0.3,
                  dailyCalories: calculateProteinDailyCalories(2000, 30),
                  dailyGrams: calculateProteinDailyGrams(2000, 30),
                },
                fat: {
                  dailyPercentage: 0.3,
                  dailyCalories: calculateFatDailyCalories(2000, 30),
                  dailyGrams: calculateFatDailyGrams(2000, 30),
                },
              },
            },
            physicalFitnessGoals: {
              bodyWeightGoal: 0,
            },
          };

          await setDoc(userSettingsDocRef, defaultSettings);
          setUserSettings(defaultSettings);
        }
      }
    };

    fetchUserSettings();
  }, [userId]);

  // Update user settings in Firestore
  const updateUserSettings = async (updatedSettings) => {
    try {
      const userSettingsDocRef = doc(db, `users/${userId}/settings`, userId);
      await setDoc(userSettingsDocRef, updatedSettings, { merge: true });
      setUserSettings((prevSettings) => ({
        ...prevSettings,
        ...updatedSettings,
      }));
    } catch (error) {
      console.error("Error updating user settings:", error);
    }
  };

  // Getter methods
  const getUserProfile = () => userSettings?.profile || {};
  const getAppAppearance = () => userSettings?.appAppearance || {};
  const getNutritionalGoals = () => userSettings?.nutritionalGoals || {};
  const getPhysicalFitnessGoals = () =>
    userSettings?.physicalFitnessGoals || {};

  // Setter methods
  const setUserProfile = (newProfile) =>
    updateUserSettings({ profile: newProfile });
  const setAppAppearance = (newAppearance) =>
    updateUserSettings({ appAppearance: newAppearance });
  // Setter methods with updated calculations
  const setNutritionalGoals = (newGoals) => {
    // Calculate protein, fat, and carbs goals based on percentages
    const { calorieGoal, proteinPercentage, carbPercentage, fatPercentage } =
      newGoals;

    const newCalorieGoal = calorieGoal;
    const newCarbPercentage = carbPercentage / 100;
    const newProteinPercentage = proteinPercentage / 100;
    const newFatPercentage = fatPercentage / 100;

    // Update user settings with calculated goals
    updateUserSettings({
      nutritionalGoals: {
        calorieGoal: newCalorieGoal,
        macroGoals: {
          carb: {
            dailyPercentage: newCarbPercentage,
            dailyCalories: calculateCarbDailyCalories(
              newCalorieGoal,
              carbPercentage
            ),
            dailyGrams: calculateCarbDailyGrams(newCalorieGoal, carbPercentage),
          },
          protein: {
            dailyPercentage: newProteinPercentage,
            dailyCalories: calculateProteinDailyCalories(
              newCalorieGoal,
              proteinPercentage
            ),
            dailyGrams: calculateProteinDailyGrams(
              newCalorieGoal,
              proteinPercentage
            ),
          },
          fat: {
            dailyPercentage: newFatPercentage,
            dailyCalories: calculateFatDailyCalories(
              newCalorieGoal,
              fatPercentage
            ),
            dailyGrams: calculateFatDailyGrams(newCalorieGoal, fatPercentage),
          },
        },
      },
    });
  };

  const setPhysicalFitnessGoals = (newGoals) =>
    updateUserSettings({ physicalFitnessGoals: newGoals });

  const contextValue = useMemo(() => {
    return {
      userSettings,
      getUserProfile,
      getAppAppearance,
      getNutritionalGoals,
      getPhysicalFitnessGoals,
      setUserProfile,
      setAppAppearance,
      setNutritionalGoals,
      setPhysicalFitnessGoals,
      calculateProteinDailyGrams,
      calculateCarbDailyGrams,
      calculateFatDailyGrams,
    };
  }, [
    userSettings,
    getUserProfile,
    getAppAppearance,
    getNutritionalGoals,
    getPhysicalFitnessGoals,
    setUserProfile,
    setAppAppearance,
    setNutritionalGoals,
    setPhysicalFitnessGoals,
    calculateProteinDailyGrams,
    calculateCarbDailyGrams,
    calculateFatDailyGrams,
  ]);

  return (
    <UserSettingsContext.Provider value={contextValue}>
      {children}
    </UserSettingsContext.Provider>
  );
}
