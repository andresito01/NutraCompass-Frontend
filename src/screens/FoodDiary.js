import React, { useState } from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { useTheme, Card, Button } from "react-native-paper"; // Import Paper components
import { useIsFocused } from "@react-navigation/native";
import FoodEntryModal from "../features/foodlog/components/FoodEntryModal.js";
import MealSectionCustomizationModal from "../features/foodlog/components/MealSectionCustomizationModal.js";
import foodDiaryScreenStyles from "./styles/foodDiaryScreenStyles.js";
import FoodEntryList from "../features/foodlog/components/FoodEntryList.js";
import DateSelector from "../features/foodlog/components/DateSelector.js";
import FoodlogFabGroupMenu from "../features/foodlog/components/FabGroupMenu.js";

export default function FoodDiaryScreen() {
  const styles = foodDiaryScreenStyles(); // Use the imported styles

  // State Management
  const [mealSections, setMealSections] = useState([
    { id: "breakfast", name: "Breakfast", order: 1 },
    { id: "lunch", name: "Lunch", order: 2 },
    { id: "dinner", name: "Dinner", order: 3 },
  ]);

  const initialFoodEntries = {
    breakfast: [],
    lunch: [],
    dinner: [],
  };

  const [foodEntries, setFoodEntries] = useState(initialFoodEntries);

  // const [breakfastEntries, setBreakfastEntries] = useState([]);
  // const [lunchEntries, setLunchEntries] = useState([]);
  // const [dinnerEntries, setDinnerEntries] = useState([]);
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

  const isFocused = useIsFocused(); // Variable to determin whether the FoodLogScreen is the current screen in focus, therefore the FoodlogFabGroupMenu should be visible

  const calculateTotalCalories = (entries) => {
    return entries.reduce((total, entry) => total + entry.calories, 0);
  };

  const handleAddEntry = (mealType) => {
    setActiveMealSection(mealType); // Set the active meal section
    setIsFoodEntryModalVisible(true); // Show modal
  };

  const handleSaveEntry = (mealType, newFoodName, newFoodCalories) => {
    console.log("Date Entry Saved To: ", selectedDate);
    const newEntry = {
      date: selectedDate,
      foodName: newFoodName,
      calories: newFoodCalories,
    };

    const updatedEntries = {
      ...foodEntries,
      [mealType]: [...foodEntries[mealType], newEntry],
    };
    setFoodEntries(updatedEntries);

    setIsFoodEntryModalVisible(false); // Hide modal
    setActiveMealSection(null); // Reset active meal section
  };

  const handleSaveCustomizations = (updatedSections) => {
    setMealSections(updatedSections);
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

  const filteredEntriesByMeal = {};
  mealSections.forEach((section) => {
    if (foodEntries[section.id]) {
      filteredEntriesByMeal[section.id] = foodEntries[section.id].filter(
        (entry) => entry.date === selectedDate
      );
    } else {
      console.log(`No entries found for meal section: ${section.id}`);
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
        {mealSections.map((section) => (
          <Card key={section.id} style={styles.section}>
            <Card.Content>
              <View style={styles.mealSectionHeaderContainer}>
                <Text style={styles.sectionTitle}>{section.name}</Text>
                <Text style={styles.totalMealSectionCalories}>
                  {calculateTotalCalories(filteredEntriesByMeal[section.id])}
                </Text>
              </View>
              <FoodEntryList
                foodEntryItems={filteredEntriesByMeal[section.id]}
                setFoodEntryItems={(newEntries) => {
                  const updatedEntries = {
                    ...foodEntries,
                    [section.id]: newEntries,
                  };
                  setFoodEntries(updatedEntries);
                }}
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
        ))}
      </ScrollView>

      <FoodlogFabGroupMenu
        isFocused={isFocused}
        openMealSectionCustomizationModal={
          handleOpenMealSectionCustomizationModal
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
        onCancel={handleCloseMealSectionCustomizationModal}
        onSaveCustomizations={handleSaveCustomizations}
        mealSections={mealSections}
        setMealSections={setMealSections}
        foodEntries={foodEntries}
        setFoodEntries={setFoodEntries}
      />
    </SafeAreaView>
  );
}
