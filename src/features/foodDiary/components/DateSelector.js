import React, { useState } from "react";
import { Text, View, TouchableOpacity, Modal } from "react-native";
import { useTheme, Card } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import dateSelectorStyles from "./styles/dateSelectorStyles.js";

export default function DateSelector({ selectedDate, setSelectedDate }) {
  const paperTheme = useTheme();
  const styles = dateSelectorStyles();

  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);

  const handleCalendarToggle = () => {
    setIsCalendarModalVisible(!isCalendarModalVisible);
  };

  const handleDateChange = (newDate) => {
    if (newDate.dateString) {
      setSelectedDate(newDate.dateString);
    } else {
      const dateString = new Date(newDate).toISOString().split("T")[0];
      setSelectedDate(dateString);
    }
    setIsCalendarModalVisible(false);
    // You might also want to fetch food logs associated with the new date here
  };

  const subtractDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    const timeZoneOffset = newDate.getTimezoneOffset();
    newDate.setMinutes(newDate.getMinutes() + timeZoneOffset);
    return newDate.toISOString().split("T")[0]; // Format the date
  };

  const addDay = (date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    const timeZoneOffset = newDate.getTimezoneOffset();
    newDate.setMinutes(newDate.getMinutes() + timeZoneOffset);
    return newDate.toISOString().split("T")[0]; // Format the date
  };

  const getCurrentDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const selectedDateObj = new Date(date);
    const timeZoneOffset = selectedDateObj.getTimezoneOffset();
    selectedDateObj.setMinutes(selectedDateObj.getMinutes() + timeZoneOffset);
    return selectedDateObj.toLocaleDateString(undefined, options);
  };

  const getDateInfo = (date) => {
    if (typeof date === Date) {
      date = date.toISOString().split("T")[0];
    }

    const currentDate = new Date();
    const timeZoneOffset = currentDate.getTimezoneOffset();
    currentDate.setMinutes(currentDate.getMinutes() + timeZoneOffset);
    const currentDateStr = currentDate.toISOString().split("T")[0];

    if (date === currentDateStr) {
      return "Today";
    } else if (date === addDay(currentDate)) {
      return "Tomorrow";
    } else if (date === subtractDay(currentDate)) {
      return "Yesterday";
    } else {
      return "";
    }
  };

  const handlePrevDay = () => {
    setSelectedDate(subtractDay(selectedDate));
  };

  const handleNextDay = () => {
    setSelectedDate(addDay(selectedDate));
  };

  return (
    <View>
      <Card
        style={{
          ...styles.section,
          marginBottom: 0,
          backgroundColor: paperTheme.colors.background,
        }}
      >
        <Card.Content>
          <View style={styles.headerDateContainer}>
            <TouchableOpacity onPress={handlePrevDay}>
              <Feather
                name="chevron-left"
                size={28}
                color={paperTheme.colors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCalendarToggle}>
              <View style={styles.calendarModalButton}>
                <Feather
                  name="calendar"
                  size={24}
                  color={paperTheme.colors.text}
                />
                <Text style={styles.date}>{getCurrentDate(selectedDate)}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextDay}>
              <Feather
                name="chevron-right"
                size={28}
                color={paperTheme.colors.text}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.dateInfo}>{getDateInfo(selectedDate)}</Text>
        </Card.Content>
      </Card>

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
                calendarBackground: paperTheme.colors.background,
                selectedDayBackgroundColor: paperTheme.colors.primary,
                selectedDayTextColor: paperTheme.colors.text,
                todayTextColor: paperTheme.colors.text,
                "stylesheet.calendar.header": {
                  monthText: {
                    color: paperTheme.colors.text,
                    fontSize: 25,
                  },
                  dayHeader: {
                    color: paperTheme.colors.text,
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
                    }
                  >
                    <View
                      style={{
                        height: 50,
                        width: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                          state === "selected"
                            ? paperTheme.colors.primary
                            : isCurrentDate
                            ? "#1abc9c"
                            : "transparent",
                        borderRadius: 25,
                      }}
                    >
                      <Text
                        style={{
                          color: paperTheme.colors.text,
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
    </View>
  );
}
