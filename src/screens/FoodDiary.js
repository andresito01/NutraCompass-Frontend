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
  const [breakfastEntries, setBreakfastEntries] = useState([]);
  const [lunchEntries, setLunchEntries] = useState([]);
  const [dinnerEntries, setDinnerEntries] = useState([]);
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

  console.log("Breakfast Entries: ", breakfastEntries);
  console.log("Lunch Entries: ", lunchEntries);
  console.log("Dinner Entries: ", dinnerEntries);

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

    if (mealType === "breakfast") {
      const updatedEntries = [...breakfastEntries, newEntry];

      setBreakfastEntries(updatedEntries);
    } else if (mealType === "lunch") {
      const updatedEntries = [...lunchEntries, newEntry];

      setLunchEntries(updatedEntries);
    } else if (mealType === "dinner") {
      const updatedEntries = [...dinnerEntries, newEntry];

      setDinnerEntries(updatedEntries);
    }

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

  const filteredBreakfastEntries = breakfastEntries.filter(
    (entry) => entry.date === selectedDate
  );

  const filteredLunchEntries = lunchEntries.filter(
    (entry) => entry.date === selectedDate
  );

  const filteredDinnerEntries = dinnerEntries.filter(
    (entry) => entry.date === selectedDate
  );

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
                {calculateTotalCalories([
                  ...filteredBreakfastEntries,
                  ...filteredLunchEntries,
                  ...filteredDinnerEntries,
                ])}
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
                  calculateTotalCalories([
                    ...filteredBreakfastEntries,
                    ...filteredLunchEntries,
                    ...filteredDinnerEntries,
                  ])}
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
        {/* Breakfast Section */}
        <Card style={styles.section}>
          <Card.Content>
            <View style={styles.mealSectionHeaderContainer}>
              <Text style={styles.sectionTitle}>Breakfast</Text>
              <Text style={styles.totalMealSectionCalories}>
                {calculateTotalCalories(filteredBreakfastEntries)}
              </Text>
            </View>
            <FoodEntryList
              foodEntryItems={filteredBreakfastEntries}
              setFoodEntryItems={setBreakfastEntries}
              mealType={"breakfast"}
            />
            <Button
              style={styles.addButton}
              mode="elevated"
              onPress={() => handleAddEntry("breakfast")}
            >
              Add Food
            </Button>
          </Card.Content>
        </Card>

        {/* Lunch Section */}
        <Card style={styles.section}>
          <Card.Content>
            <View style={styles.mealSectionHeaderContainer}>
              <Text style={styles.sectionTitle}>Lunch</Text>
              <Text style={styles.totalMealSectionCalories}>
                {calculateTotalCalories(filteredLunchEntries)}
              </Text>
            </View>
            <FoodEntryList
              foodEntryItems={filteredLunchEntries}
              setFoodEntryItems={setLunchEntries}
              mealType={"lunch"}
            />
            <Button
              style={styles.addButton}
              mode="elevated"
              onPress={() => handleAddEntry("lunch")}
            >
              Add Food
            </Button>
          </Card.Content>
        </Card>

        {/* Dinner Section */}
        <Card style={styles.section}>
          <Card.Content>
            <View style={styles.mealSectionHeaderContainer}>
              <Text style={styles.sectionTitle}>Dinner</Text>
              <Text style={styles.totalMealSectionCalories}>
                {calculateTotalCalories(filteredDinnerEntries)}
              </Text>
            </View>
            <FoodEntryList
              foodEntryItems={filteredDinnerEntries}
              setFoodEntryItems={setDinnerEntries}
              mealType={"dinner"}
            />
            <Button
              style={styles.addButton}
              mode="elevated"
              onPress={() => handleAddEntry("dinner")}
            >
              Add Food
            </Button>
          </Card.Content>
        </Card>
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
      />
    </SafeAreaView>
  );
}
