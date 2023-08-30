import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useAuth } from "../hooks/useAuth";
import FoodEntryModal from "../features/foodlog/components/FoodEntryModal.js";
import { Calendar } from "react-native-calendars";
import { Feather } from "@expo/vector-icons"; // Example of using Feather icons

export default function FoodlogScreen() {
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
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);

  const handleCalendarToggle = () => {
    setIsCalendarModalVisible(!isCalendarModalVisible);
  };

  const handleDateChange = (newDate) => {
    console.log(newDate);
    setSelectedDate(newDate);
    setIsCalendarModalVisible(false); // Close the calendar modal after date selection
    // You might also want to fetch food logs associated with the new date here
  };

  // Subtract a day
  const subtractDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    return newDate;
  };

  // Add a day
  const addDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  };

  const getCurrentDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const selectedDateObj = new Date(selectedDate);
    return selectedDateObj.toLocaleDateString(undefined, options);
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
      date: selectedDate,
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
      <ScrollView
        contentContainerStyle={styles.containerContent}
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.headerDateContainer}>
            {/* Arrow button to go back one day */}
            <TouchableOpacity
              onPress={() => handleDateChange(subtractDay(selectedDate))}
            >
              <Feather name="chevron-left" size={24} color="white" />
            </TouchableOpacity>

            {/* Date and calendar icon */}
            <TouchableOpacity onPress={handleCalendarToggle}>
              <View style={styles.calendarModalButton}>
                <Feather name="calendar" size={24} color="white" />
                <Text style={styles.date}>{getCurrentDate(selectedDate)}</Text>
              </View>
            </TouchableOpacity>

            {/* Arrow button to go forward one day */}
            <TouchableOpacity
              onPress={() => handleDateChange(addDay(selectedDate))}
            >
              <Feather name="chevron-right" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.totalDayCalories}>
            Total Calories Today:{" "}
            {calculateTotalCalories([
              ...filteredBreakfastEntries,
              ...filteredLunchEntries,
              ...filteredDinnerEntries,
            ])}
          </Text>
        </View>

        {/* Breakfast Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionTitle}>Breakfast</Text>
            <Text style={styles.totalCalories}>
              Total Calories: {calculateTotalCalories(filteredBreakfastEntries)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddEntry("breakfast")}
          >
            <Text style={styles.addButtonLabel}>Add Food</Text>
          </TouchableOpacity>
          {filteredBreakfastEntries.map((entry, index) => (
            <View key={index} style={styles.entry}>
              <View style={styles.entryInfo}>
                <Text style={styles.entryFoodNameText}>{entry.foodName}</Text>
                <Text
                  style={styles.entryCaloriesText}
                >{`${entry.calories} cal`}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteEntry("breakfast", index)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Lunch Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionTitle}>Lunch</Text>
            <Text style={styles.totalCalories}>
              Total Calories: {calculateTotalCalories(filteredLunchEntries)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddEntry("lunch")}
          >
            <Text style={styles.addButtonLabel}>Add Food</Text>
          </TouchableOpacity>
          {filteredLunchEntries.map((entry, index) => (
            <View key={index} style={styles.entry}>
              <View style={styles.entryInfo}>
                <Text style={styles.entryFoodNameText}>{entry.foodName}</Text>
                <Text
                  style={styles.entryCaloriesText}
                >{`${entry.calories} cal`}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteEntry("lunch", index)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Dinner Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionTitle}>Dinner</Text>
            <Text style={styles.totalCalories}>
              Total Calories: {calculateTotalCalories(filteredDinnerEntries)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddEntry("dinner")}
          >
            <Text style={styles.addButtonLabel}>Add Food</Text>
          </TouchableOpacity>
          {filteredDinnerEntries.map((entry, index) => (
            <View key={index} style={styles.entry}>
              <View style={styles.entryInfo}>
                <Text style={styles.entryFoodNameText}>{entry.foodName}</Text>
                <Text
                  style={styles.entryCaloriesText}
                >{`${entry.calories} cal`}</Text>
              </View>
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

      {/* Calendar Modal */}
      <Modal
        visible={isCalendarModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.calendarModal}>
          {/* You can use react-native-calendars components here to show the calendar */}
          {/* Pass handleDateChange as a callback to update selectedDate */}
          <Calendar
            current={selectedDate.toString()}
            onDayPress={handleDateChange}
            hideExtraDays
            theme={{
              selectedDayBackgroundColor: "#2c3b54",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#2c3b54",
            }}
          />
        </View>
      </Modal>

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
    padding: 1,
    backgroundColor: "#0e1529",
  },
  containerContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: "#0a0f1f",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#CCCCCC",
    height: "20%",
    maxHeight: "35%",
  },
  headerDateContainer: {
    flex: 2,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent black background
  },
  date: {
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  calendarModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
  },
  calendarModalButton: {
    flexDirection: "row",
  },
  totalDayCalories: {
    flex: 1,
    fontSize: 18,
    paddingTop: 15,
    color: "white",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#0a0f1f",
    borderColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white border color
    borderWidth: 2,
    shadowColor: "#FFFFFF", // White shadow
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    alignItems: "center", // Align items vertically
    justifyContent: "space-between", // Space items evenly along the row
    paddingBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  addButton: {
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#2c3b54",
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
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F2F2F2",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  entryInfo: {
    flex: 1,
  },
  entryFoodNameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  entryCaloriesText: {
    fontSize: 14,
    color: "#666",
  },
  deleteButton: {
    backgroundColor: "#E74C3C",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  totalCalories: {
    marginTop: 8,
    fontWeight: "bold",
    color: "white",
  },
});
