import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAuth } from "../hooks/useAuth";
import FoodEntryModal from "../features/foodlog/components/FoodEntryModal.js";

export default function FoodlogScreen() {
  const { user } = useAuth();

  // State Management
  const [breakfastEntries, setBreakfastEntries] = useState([]);
  const [lunchEntries, setLunchEntries] = useState([]);
  const [dinnerEntries, setDinnerEntries] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeMealSection, setActiveMealSection] = useState(null);

  const getCurrentDate = () => {
    const now = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return now.toLocaleDateString(undefined, options);
  };

  const calculateTotalCalories = (entries) => {
    return entries.reduce((total, entry) => total + entry.calories, 0);
  };

  const handleAddEntry = (mealType) => {
    setActiveMealSection(mealType); // Set the active meal section
    setIsModalVisible(true); // Show modal
  };

  const handleDeleteEntry = (mealType, index) => {
    if (mealType === "breakfast") {
      const updatedEntries = [...breakfastEntries];
      updatedEntries.splice(index, 1);
      setBreakfastEntries(updatedEntries);
    } else if (mealType === "lunch") {
      const updatedEntries = [...lunchEntries];
      updatedEntries.splice(index, 1);
      setLunchEntries(updatedEntries);
    } else if (mealType === "dinner") {
      const updatedEntries = [...dinnerEntries];
      updatedEntries.splice(index, 1);
      setDinnerEntries(updatedEntries);
    }
  };

  // Food Entry Modal Methods

  const handleSaveEntry = (mealType, newFoodName, newFoodCalories) => {
    const newEntry = {
      foodName: newFoodName,
      calories: newFoodCalories,
    };

    if (mealType === "breakfast") {
      setBreakfastEntries([...breakfastEntries, newEntry]);
    } else if (mealType === "lunch") {
      setLunchEntries([...lunchEntries, newEntry]);
    } else if (mealType === "dinner") {
      setDinnerEntries([...dinnerEntries, newEntry]);
    }

    setIsModalVisible(false); // Hide modal
    setActiveMealSection(null); // Reset active meal section
  };

  const handleCancelEntry = () => {
    setIsModalVisible(false); // Hide modal
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.date}>{getCurrentDate()}</Text>
          <Text style={styles.totalDayCalories}>
            Total Calories Today:{" "}
            {calculateTotalCalories([
              ...breakfastEntries,
              ...lunchEntries,
              ...dinnerEntries,
            ])}
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionTitle}>Breakfast</Text>
            <Text style={styles.totalCalories}>
              Total Calories: {calculateTotalCalories(breakfastEntries)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddEntry("breakfast")}
          >
            <Text style={styles.addButtonLabel}>Add Food</Text>
          </TouchableOpacity>
          {breakfastEntries.map((entry, index) => (
            <View key={index} style={styles.entry}>
              <Text>{entry.foodName}</Text>
              <Text>{`${entry.calories} cal`}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteEntry("breakfast", index)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionTitle}>Lunch</Text>
            <Text style={styles.totalCalories}>
              Total Calories: {calculateTotalCalories(lunchEntries)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddEntry("lunch")}
          >
            <Text style={styles.addButtonLabel}>Add Food</Text>
          </TouchableOpacity>
          {lunchEntries.map((entry, index) => (
            <View key={index} style={styles.entry}>
              <Text>{entry.foodName}</Text>
              <Text>{`${entry.calories} cal`}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteEntry("lunch", index)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionTitle}>Dinner</Text>
            <Text style={styles.totalCalories}>
              Total Calories: {calculateTotalCalories(dinnerEntries)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddEntry("dinner")}
          >
            <Text style={styles.addButtonLabel}>Add Food</Text>
          </TouchableOpacity>
          {dinnerEntries.map((entry, index) => (
            <View key={index} style={styles.entry}>
              <Text>{entry.foodName}</Text>
              <Text>{`${entry.calories} cal`}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteEntry("dinner", index)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
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

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalDayCalories: {
    marginTop: 8,
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
    padding: 12,
    borderRadius: 8,
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    alignItems: "center", // Align items vertically
    justifyContent: "space-between", // Space items evenly along the row
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addButton: {
    marginTop: 8,
    backgroundColor: "blue",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  addButtonLabel: {
    color: "white",
  },
  entry: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "white",
  },
  totalCalories: {
    marginTop: 8,
    fontWeight: "bold",
  },
});
