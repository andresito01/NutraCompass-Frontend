import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, Title, useTheme } from "react-native-paper";
import Modal from "react-native-modal"; // Import the Modal component from react-native-modal
import dailyNutritionGoalsCustomizationModalStyles from "./styles/dailyNutritionGoalsCustomizationModalStyles.js";
import Feather from "react-native-vector-icons/Feather";

const DailyNutritionGoalsCustomizationModal = ({ isVisible, closeModal }) => {
  const styles = dailyNutritionGoalsCustomizationModalStyles();
  const paperTheme = useTheme();

  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);

  const [activeField, setActiveField] = useState(null); // To track which input field is active
  const [tempChanges, setTempChanges] = useState({}); // State to store temporary changes

  const handleInputUpdate = (field) => {
    const newValue = tempChanges[field] || eval(field);

    switch (field) {
      case "calories":
        setCalories(parseFloat(newValue)); // Convert to a number
        break;
      case "protein":
        setProtein(parseFloat(newValue)); // Convert to a number
        break;
      case "carbs":
        setCarbs(parseFloat(newValue)); // Convert to a number
        break;
      case "fats":
        setFats(parseFloat(newValue)); // Convert to a number
        break;
      default:
        break;
    }

    Keyboard.dismiss();
    setActiveField(null);
  };

  // Function to handle changes made by the user in the input fields
  const handleInputChange = (field, text) => {
    // Update the temporary changes with the new value
    setTempChanges({
      ...tempChanges,
      [field]: text,
    });
  };

  return (
    <Modal
      isVisible={isVisible}
      style={{ flex: 1, height: "100%", width: "100%", margin: 0 }}
      avoidKeyboard={true}
      onSwipeComplete={!activeField ? closeModal : null} // Close the modal when swiped down
      swipeDirection={!activeField ? "down" : null} // Allow swiping down to close the modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: paperTheme.colors.background,
          alignItems: "center",
        }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={closeModal}
            disabled={activeField ? true : false}
          >
            <Feather
              name="arrow-left"
              color={paperTheme.colors.text}
              size={28}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <Title style={{ textAlign: "center", marginBottom: 10 }}>
            Customize Daily Nutrition Goals
          </Title>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Calories</Text>
            <TextInput
              value={
                tempChanges.calories !== undefined
                  ? tempChanges.calories.toString()
                  : calories.toString()
              }
              keyboardType="numeric"
              style={styles.input}
              onFocus={() => setActiveField("calories")}
              onChangeText={(text) => handleInputChange("calories", text)}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Protein (g)</Text>
            <TextInput
              value={
                tempChanges.protein !== undefined
                  ? tempChanges.protein.toString()
                  : protein.toString()
              }
              keyboardType="numeric"
              style={styles.input}
              onFocus={() => setActiveField("protein")}
              onChangeText={(text) => handleInputChange("protein", text)}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Carbs (g)</Text>
            <TextInput
              value={
                tempChanges.carbs !== undefined
                  ? tempChanges.carbs.toString()
                  : carbs.toString()
              }
              keyboardType="numeric"
              style={styles.input}
              onFocus={() => setActiveField("carbs")}
              onChangeText={(text) => handleInputChange("carbs", text)}
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label}>Fats (g)</Text>
            <TextInput
              value={
                tempChanges.fats !== undefined
                  ? tempChanges.fats.toString()
                  : fats.toString()
              }
              keyboardType="numeric"
              style={styles.input}
              onFocus={() => setActiveField("fats")}
              onChangeText={(text) => handleInputChange("fats", text)}
            />
          </View>
        </View>
        {activeField && (
          <View
            style={{
              position: "absolute",
              flexDirection: "row",
              alignItems: "center",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 10,
              backgroundColor: paperTheme.colors.primary, // Adjust background color as needed
              zIndex: 2,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setTempChanges({});
                setActiveField(null);
              }}
              style={{ flex: 1, alignItems: "center" }}
            >
              <Feather name="x" size={24} color="white" />
            </TouchableOpacity>

            <Text
              style={{
                flex: 3,
                color: "white",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              {activeField
                ? activeField.charAt(0).toUpperCase() + activeField.slice(1)
                : ""}
            </Text>

            <TouchableOpacity
              onPress={() => handleInputUpdate(activeField)}
              style={{ flex: 1, alignItems: "center" }}
            >
              <Feather name="check" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default DailyNutritionGoalsCustomizationModal;
