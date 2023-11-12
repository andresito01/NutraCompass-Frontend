import React, { useState } from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { useTheme, Card, Button } from "react-native-paper"; // Import Paper components
import { useIsFocused } from "@react-navigation/native";
import FoodEntryModal from "../features/foodlog/components/FoodEntryModal.js";
import MealSectionCustomizationModal from "../features/foodlog/components/MealSectionCustomizationModal.js";
import DailyNutritionGoalsCustomizationModal from "../features/foodlog/components/DailyNutritionGoalsCustomizationModal.js";
import foodDiaryScreenStyles from "./styles/foodDiaryScreenStyles.js";
import FoodEntryList from "../features/foodlog/components/FoodEntryList.js";
import DateSelector from "../features/foodlog/components/DateSelector.js";
import FoodlogFabGroupMenu from "../features/foodlog/components/FabGroupMenu.js";
import { useFoodLog } from "../features/foodlog/context/FoodLogContext.js";

export default function FoodDiaryScreen() {
  const styles = foodDiaryScreenStyles(); // Use the imported styles

  const { mealSections, foodEntries, saveFoodLogEntry } = useFoodLog();

  const [activeMealSection, setActiveMealSection] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  // Modal State Management
  const [isFoodEntryModalVisible, setIsFoodEntryModalVisible] = useState(false);
  const [
    isMealSectionCustomizationModalVisible,
    setIsMealSectionCustomizationModalVisible,
  ] = useState(false);
  const [
    isDailyNutritionGoalsCustomizationModalVisible,
    setIsDailyNutritionGoalsCustomizationModalVisible,
  ] = useState(false);

  const isFocused = useIsFocused(); // Variable to determin whether the FoodLogScreen is the current screen in focus, therefore the FoodlogFabGroupMenu should be visible

  const calculateTotalCalories = (entries) => {
    if (!Array.isArray(entries)) {
      return 0;
    }

    return entries.reduce((total, entry) => {
      if (entry && entry.foodCalories) {
        return total + entry.foodCalories;
      } else {
        return total;
      }
    }, 0);
  };

  const handleAddEntry = (mealType) => {
    setActiveMealSection(mealType); // Set the active meal section
    setIsFoodEntryModalVisible(true); // Show modal
  };

  const handleSaveEntry = (mealType, newFoodName, newFoodCalories) => {
    // Call the context method to save the food entry
    saveFoodLogEntry(mealType, newFoodName, newFoodCalories, selectedDate);

    setIsFoodEntryModalVisible(false); // Hide modal
    setActiveMealSection(null); // Reset active meal section
  };

  const handleCancelEntry = () => {
    setIsFoodEntryModalVisible(false); // Hide modal
  };

  const handleCloseMealSectionCustomizationModal = () => {
    setIsMealSectionCustomizationModalVisible(false);
  };

  const handleOpenMealSectionCustomizationModal = () => {
    setIsMealSectionCustomizationModalVisible(true);
  };

  const handleCloseDailyNutritionGoalsCustomizationModal = () => {
    setIsDailyNutritionGoalsCustomizationModalVisible(false);
  };

  const handleOpenDailyNutritionGoalsCustomizationModal = () => {
    setIsDailyNutritionGoalsCustomizationModalVisible(true);
  };

  const filteredEntriesByMeal = {};
  mealSections.forEach((section) => {
    if (foodEntries[section.id]) {
      filteredEntriesByMeal[section.id] = foodEntries[section.id].filter(
        (entry) => entry.date === selectedDate
      );
      console.log(
        `Entries for ${section.name}:`,
        filteredEntriesByMeal[section.id]
      );
    }
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* Date Selector Section */}
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Total Day Calories Progress Section */}
      <Card style={styles.section}>
        <Card.Content>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionTitle}>Calories Remaining</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
              <Text style={styles.totalDayCalories}>2700 {"      - "}</Text>
              <Text style={styles.totalDayCaloriesProgressSectionText}>
                Goal
              </Text>
            </View>
            <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
              <Text style={styles.totalDayCalories}>
                {calculateTotalCalories(
                  mealSections.flatMap(
                    (section) => filteredEntriesByMeal[section.id]
                  )
                )}
                {"      + "}
              </Text>
              <Text style={styles.totalDayCaloriesProgressSectionText}>
                Food
              </Text>
            </View>
            <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
              <Text style={styles.totalDayCalories}>0 {"            = "}</Text>
              <Text style={styles.totalDayCaloriesProgressSectionText}>
                Exercise
              </Text>
            </View>
            <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
              <Text style={styles.totalDayCalories}>
                {2700 -
                  calculateTotalCalories(
                    mealSections.flatMap(
                      (section) => filteredEntriesByMeal[section.id]
                    )
                  )}
              </Text>
              <Text style={styles.totalDayCaloriesProgressSectionText}>
                Remaining
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainerContent}
        style={styles.scrollViewContainer}
      >
        {mealSections.map(
          (section) =>
            section.name && (
              <Card key={section.id} style={styles.section}>
                <Card.Content>
                  <View style={styles.mealSectionHeaderContainer}>
                    <Text style={styles.sectionTitle}>{section.name}</Text>
                    <Text style={styles.totalMealSectionCalories}>
                      {calculateTotalCalories(
                        filteredEntriesByMeal[section.id]
                      )}
                    </Text>
                  </View>
                  <FoodEntryList
                    foodEntryItems={filteredEntriesByMeal[section.id]}
                    mealType={section.id}
                  />
                  <Button
                    style={styles.addButton}
                    mode="elevated"
                    onPress={() => handleAddEntry(section.id)}
                  >
                    Add Food
                  </Button>
                </Card.Content>
              </Card>
            )
        )}
      </ScrollView>

      <FoodlogFabGroupMenu
        isFocused={isFocused}
        openMealSectionCustomizationModal={
          handleOpenMealSectionCustomizationModal
        }
        openDailyNutritionGoalsCustomizationModal={
          handleOpenDailyNutritionGoalsCustomizationModal
        }
      />

      {/* Food Entry Modal opens when Add Food button is clicked */}
      <FoodEntryModal
        isVisible={isFoodEntryModalVisible}
        onSave={(foodName, calories) =>
          handleSaveEntry(activeMealSection, foodName, calories)
        }
        onCancel={handleCancelEntry}
      />

      {/* Meal Section Customization Modal opens when the Fab Group action button called Customize Meal Names is clicked */}
      <MealSectionCustomizationModal
        isVisible={isMealSectionCustomizationModalVisible}
        closeModal={handleCloseMealSectionCustomizationModal}
      />
      {/* Daily Nutrition Goals Customization opens when the Fab Group action button called Customize Daily Nutrition Goals is clicked */}
      <DailyNutritionGoalsCustomizationModal
        isVisible={isDailyNutritionGoalsCustomizationModalVisible}
        closeModal={handleCloseDailyNutritionGoalsCustomizationModal}
      />
    </SafeAreaView>
  );
}
