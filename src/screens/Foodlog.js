import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { useTheme, Card, Button, FAB } from "react-native-paper"; // Import Paper components
import { useAuth } from "../hooks/useAuth";
import FoodEntryModal from "../features/foodlog/components/FoodEntryModal.js";
import { Calendar } from "react-native-calendars";
import { Feather } from "@expo/vector-icons"; // Example of using Feather icons
import { AutoFocus } from "expo-camera";
import foodlogScreenStyles from "./styles/foodlogScreenStyles.js";
import FoodEntryList from "../features/foodlog/components/FoodEntryList.js";

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
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);

  //const [dateInfo, setDateInfo] = useState("null")
  const handleCalendarToggle = () => {
    setIsCalendarModalVisible(!isCalendarModalVisible);
  };

  const handleDateChange = (newDate) => {
    console.log("newDate: ", newDate);
    if (newDate.dateString) {
      console.log("Date set to: ", newDate.dateString);
      setSelectedDate(newDate.dateString); // Use newDate.dateString if it exists
    } else {
      console.log("Date set to: ", newDate);
      setSelectedDate(newDate); // Assume newDate is already in string format
    }
    setIsCalendarModalVisible(false); // Close the calendar modal after date selection
    // You might also want to fetch food logs associated with the new date here
  };

  // Subtract a day
  const subtractDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    // Set the time zone offset
    const timeZoneOffset = newDate.getTimezoneOffset();
    newDate.setMinutes(newDate.getMinutes() + timeZoneOffset);
    return newDate;
  };

  // Add a day
  const addDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    // Set the time zone offset
    const timeZoneOffset = newDate.getTimezoneOffset();
    newDate.setMinutes(newDate.getMinutes() + timeZoneOffset);
    return newDate;
  };

  const getCurrentDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    console.log("Date: ", date);
    const selectedDateObj = new Date(date);
    console.log("SelectedDateObject: ", selectedDateObj);
    // Set the time zone offset
    const timeZoneOffset = selectedDateObj.getTimezoneOffset();
    selectedDateObj.setMinutes(selectedDateObj.getMinutes() + timeZoneOffset);
    console.log(
      "Current date set to: ",
      selectedDateObj.toLocaleDateString(undefined, options)
    );
    return selectedDateObj.toLocaleDateString(undefined, options);
  };

  const getDateInfo = (date) => {
    console.log("Date Type Check: ", date);
    if (typeof date === Date) {
      date = date.toISOString().split("T")[0];
    }

    console.log("getDateInfo: ", date);

    const currentDate = new Date();
    // Set the time zone offset
    const timeZoneOffset = currentDate.getTimezoneOffset();
    currentDate.setMinutes(currentDate.getMinutes() + timeZoneOffset);
    const currentDateStr = currentDate.toISOString().split("T")[0];
    //const dateStr = date.split("T")[0]; // Convert the input date to string format

    console.log("Real Time Current Date", currentDateStr);
    console.log(
      "Real Time Current Date + 1",
      addDay(currentDate).toISOString().split("T")[0]
    );
    console.log("Date:", date);
    if (date === currentDateStr) {
      return "Today";
    } else if (date === addDay(currentDate).toISOString().split("T")[0]) {
      return "Tomorrow";
    } else if (date === subtractDay(currentDate).toISOString().split("T")[0]) {
      return "Yesterday";
    } else {
      return "";
    }
  };

  const calculateTotalCalories = (entries) => {
    return entries.reduce((total, entry) => total + entry.calories, 0);
  };

  const handleAddEntry = (mealType) => {
    setActiveMealSection(mealType); // Set the active meal section
    setIsModalVisible(true); // Show modal
  };

  const handleSaveEntry = (mealType, newFoodName, newFoodCalories) => {
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
      {/* Date Section */}
      <Card
        style={{
          ...styles.section,
          marginBottom: 0,
          backgroundColor: paperTheme.colors.background,
        }}
      >
        <Card.Content>
          <View style={styles.headerDateContainer}>
            {/* Arrow button to go back one day */}
            <TouchableOpacity
              onPress={() => handleDateChange(subtractDay(selectedDate))}
            >
              <Feather
                name="chevron-left"
                size={28}
                color={paperTheme.dark ? "white" : "black"}
              />
            </TouchableOpacity>

            {/* Date and calendar icon */}
            <TouchableOpacity onPress={handleCalendarToggle}>
              <View style={styles.calendarModalButton}>
                <Feather
                  name="calendar"
                  size={24}
                  color={paperTheme.dark ? "white" : "black"}
                />
                <Text style={styles.date}>{getCurrentDate(selectedDate)}</Text>
              </View>
            </TouchableOpacity>

            {/* Arrow button to go forward one day */}
            <TouchableOpacity
              onPress={() => handleDateChange(addDay(selectedDate))}
            >
              <Feather
                name="chevron-right"
                size={28}
                color={paperTheme.dark ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.dateInfo}>{getDateInfo(selectedDate)}</Text>
        </Card.Content>
      </Card>

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
              foodEntryItems={breakfastEntries}
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

      {/* Calendar Modal */}
      <Modal
        visible={isCalendarModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.calendarModal}>
          <View style={styles.calendarWrapper}>
            <Calendar
              style={{
                height: "auto",
                width: "100%",
                backgroundColor: paperTheme.colors.surface,
              }}
              current={selectedDate.toString()}
              onDayPress={handleDateChange}
              hideExtraDays
              theme={{
                calendarBackground: paperTheme.colors.background, // Use theme background color
                selectedDayBackgroundColor: paperTheme.colors.primary, // Use theme primary color
                selectedDayTextColor: paperTheme.colors.text, // Use text color on primary
                todayTextColor: paperTheme.colors.text, // Use text color on primary
                "stylesheet.calendar.header": {
                  monthText: {
                    color: paperTheme.colors.text, // Use theme text color
                    fontSize: 25,
                  },
                  dayHeader: {
                    color: paperTheme.colors.text, // Use theme text color
                    fontSize: 20,
                    marginTop: 10,
                    marginBottom: 10,
                  },
                },
              }}
              dayComponent={({ date, state }) => {
                const isCurrentDate = date.dateString === selectedDate;
                return (
                  <TouchableOpacity
                    onPress={() =>
                      handleDateChange({ dateString: date.dateString })
                    } // Forward the event
                  >
                    <View
                      style={{
                        height: 50,
                        width: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                          state === "selected"
                            ? paperTheme.colors.primary // Use theme primary color for selected
                            : isCurrentDate
                            ? "#1abc9c" // Highlight color for the current date
                            : "transparent",
                        borderRadius: 25,
                      }}
                    >
                      <Text
                        style={{
                          color: paperTheme.colors.text, // Use theme text color
                        }}
                      >
                        {date.day}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                style={styles.cancelDateButton}
                onPress={() => setIsCalendarModalVisible(false)}
              >
                <Text style={styles.cancelDateButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelDateButton}
                onPress={() => setIsCalendarModalVisible(false)}
              >
                <Text style={styles.cancelDateButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
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
