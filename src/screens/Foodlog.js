import React, { useState } from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { useTheme, Card, Button, FAB } from "react-native-paper"; // Import Paper components
import { useAuth } from "../hooks/useAuth";
import FoodEntryModal from "../features/foodlog/components/FoodEntryModal.js";
import foodlogScreenStyles from "./styles/foodlogScreenStyles.js";
import FoodEntryList from "../features/foodlog/components/FoodEntryList.js";
import DateSelector from "../features/foodlog/components/DateSelector.js";

export default function FoodlogScreen() {
  const styles = foodlogScreenStyles(); // Use the imported styles
  const paperTheme = useTheme();
  const { user } = useAuth();

  // State Management
  const [breakfastEntries, setBreakfastEntries] = useState([]);
  const [lunchEntries, setLunchEntries] = useState([]);
  const [dinnerEntries, setDinnerEntries] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeMealSection, setActiveMealSection] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  console.log("Breakfast Entries: ", breakfastEntries);
  console.log("Lunch Entries: ", lunchEntries);
  console.log("Dinner Entries: ", dinnerEntries);

  const calculateTotalCalories = (entries) => {
    return entries.reduce((total, entry) => total + entry.calories, 0);
  };

  const handleAddEntry = (mealType) => {
    setActiveMealSection(mealType); // Set the active meal section
    setIsModalVisible(true); // Show modal
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

    setIsModalVisible(false); // Hide modal
    setActiveMealSection(null); // Reset active meal section
  };

  const handleCancelEntry = () => {
    setIsModalVisible(false); // Hide modal
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

      {/* Food Entry Modal opens when Add Food button is clicked */}
      <FoodEntryModal
        isVisible={isModalVisible}
        onSave={(foodName, calories) =>
          handleSaveEntry(activeMealSection, foodName, calories)
        }
        onCancel={handleCancelEntry}
      />
    </SafeAreaView>
  );
}
