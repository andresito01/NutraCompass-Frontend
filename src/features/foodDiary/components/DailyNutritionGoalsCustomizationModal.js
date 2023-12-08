import React, { useEffect, useState } from "react";
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
import Modal from "react-native-modal";
import dailyNutritionGoalsCustomizationModalStyles from "./styles/dailyNutritionGoalsCustomizationModalStyles.js";
import Feather from "react-native-vector-icons/Feather";
import MacroSettingsModal from "./MacroSettingsModal.js";
import { useUserSettings } from "../../userSettings/context/UserSettingsContext.js";

const DailyNutritionGoalsCustomizationModal = ({ isVisible, closeModal }) => {
  const styles = dailyNutritionGoalsCustomizationModalStyles();
  const paperTheme = useTheme();

  const {
    getNutritionalGoals,
    setNutritionalGoals,
    calculateProteinDailyGrams,
    calculateCarbDailyGrams,
    calculateFatDailyGrams,
  } = useUserSettings();
  const { calorieGoal, macroGoals } = getNutritionalGoals();

  const [calories, setCalories] = useState(calorieGoal);
  const [protein, setProtein] = useState(
    macroGoals.protein.dailyPercentage * 100
  );
  const [carb, setCarb] = useState(macroGoals.carb.dailyPercentage * 100);
  const [fat, setFat] = useState(macroGoals.fat.dailyPercentage * 100);
  const [isMacroSettingsModalVisible, setIsMacroSettingsModalVisible] =
    useState(false);

  const [activeField, setActiveField] = useState(null);
  const [tempChanges, setTempChanges] = useState({});

  const toggleMacroSettingsModal = () => {
    setIsMacroSettingsModalVisible(!isMacroSettingsModalVisible);
  };

  const handleInputUpdate = () => {
    // Convert tempChanges values to numbers
    const numericCalories =
      tempChanges?.calories !== undefined
        ? parseFloat(tempChanges.calories)
        : calories;

    const numericProtein =
      tempChanges?.protein !== undefined
        ? parseFloat(tempChanges.protein)
        : protein; // Use the original state value if not changed

    const numericCarb =
      tempChanges?.carb !== undefined ? parseFloat(tempChanges.carb) : carb;

    const numericFat =
      tempChanges?.fat !== undefined ? parseFloat(tempChanges.fat) : fat;

    // Check if the sum of percentages is equal to 100%
    const isSum100Percent = numericProtein + numericCarb + numericFat === 100;

    // Update the state values only if they have changed
    if (tempChanges.calories !== undefined) {
      setCalories(numericCalories);
      // Update the calorieGoal in the context
      // Example: setNutritionalGoals({ calorieGoal: numericCalories, ...otherFields });
    }

    if (tempChanges.protein !== undefined) {
      setProtein(numericProtein);
    }

    if (tempChanges.carb !== undefined) {
      setCarb(numericCarb);
    }

    if (tempChanges.fat !== undefined) {
      setFat(numericFat);
    }

    // Reset tempChanges and hide the modal
    setTempChanges({});
    Keyboard.dismiss();
    setActiveField(null);

    // console.log("IsSum100Percent: ", isSum100Percent);
    // console.log(
    //   "Macro Percentage Sum: ",
    //   numericProtein + numericCarb + numericFat
    // );
  };

  const handleInputChange = (field, text) => {
    setTempChanges({
      ...tempChanges,
      [field]: text,
    });
  };

  // Calculate total daily grams for each macro based on percentage
  const proteinDailyGrams = calculateProteinDailyGrams(calories, protein);
  const carbDailyGrams = calculateCarbDailyGrams(calories, carb);
  const fatDailyGrams = calculateFatDailyGrams(calories, fat);

  console.log("Calorie: " + calories + " , " + typeof calories);
  console.log("Protein: " + protein + " , " + typeof protein);
  console.log("Carb: " + carb + " , " + typeof carb);
  console.log("Fat: " + fat + " , " + typeof fat);

  useEffect(() => {
    try {
      setNutritionalGoals({
        calorieGoal: calories,
        proteinPercentage: protein,
        carbPercentage: carb,
        fatPercentage: fat,
      });
      console.log("Updating nutritional goals");
    } catch {
      console.log("Error updating nutritional goals");
    }
  }, [calories, protein, carb, fat]);

  return (
    <Modal
      isVisible={isVisible}
      style={{ flex: 1, height: "100%", width: "100%", margin: 0 }}
      avoidKeyboard={true}
      onSwipeComplete={!activeField ? closeModal : null}
      swipeDirection={!activeField ? "down" : null}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          flexDirection: "column",
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
                  ? tempChanges.calories
                  : calories.toString()
              }
              keyboardType="numeric"
              style={styles.input}
              onFocus={() => setActiveField("calories")}
              onChangeText={(text) => handleInputChange("calories", text)}
            />
          </View>

          <View style={styles.inputRow}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                paddingRight: 30,
              }}
            >
              <Text style={styles.label}>Protein</Text>
              <Text style={{ color: "gray" }}>{proteinDailyGrams} g</Text>
            </View>
            <TextInput
              value={`${protein.toString()}%`}
              inputMode="none"
              style={styles.input}
              onFocus={() => {
                setActiveField("protein");
                toggleMacroSettingsModal();
              }}
              onChangeText={(text) => {
                // Extract numeric value by removing '%' symbol
                const numericValue = text.replace("%", "");
                handleInputChange("protein", numericValue);
              }}
              caretHidden={true}
            />
          </View>

          <View style={styles.inputRow}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                paddingRight: 30,
              }}
            >
              <Text style={styles.label}>Carbs</Text>
              <Text style={{ color: "gray" }}>{carbDailyGrams} g</Text>
            </View>
            <TextInput
              value={`${carb.toString()}%`}
              inputMode="none"
              style={styles.input}
              onFocus={() => {
                setActiveField("carb");
                toggleMacroSettingsModal();
              }}
              onChangeText={(text) => {
                // Extract numeric value by removing '%' symbol
                const numericValue = text.replace("%", "");
                handleInputChange("carb", numericValue);
              }}
              caretHidden={true}
            />
          </View>

          <View style={styles.inputRow}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                paddingRight: 30,
              }}
            >
              <Text style={styles.label}>Fats </Text>
              <Text style={{ color: "gray" }}>{fatDailyGrams} g</Text>
            </View>
            <TextInput
              value={`${fat.toString()}%`}
              inputMode="none"
              style={styles.input}
              onFocus={() => {
                setActiveField("fat");
                toggleMacroSettingsModal();
              }}
              onChangeText={(text) => {
                // Extract numeric value by removing '%' symbol
                const numericValue = text.replace("%", "");
                handleInputChange("fat", numericValue);
              }}
              caretHidden={true}
            />
          </View>
        </View>

        {activeField === "calories" && (
          <View
            style={{
              position: "absolute",
              flexDirection: "row",
              alignItems: "center",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 10,
              backgroundColor: paperTheme.colors.primary,
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
              onPress={handleInputUpdate}
              style={{ flex: 1, alignItems: "center" }}
            >
              <Feather name="check" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}

        <MacroSettingsModal
          isVisible={isMacroSettingsModalVisible}
          closeModal={toggleMacroSettingsModal}
          tempChanges={tempChanges}
          activeField={activeField}
          setTempChanges={setTempChanges}
          setActiveField={setActiveField}
          handleInputChange={handleInputChange}
          handleInputUpdate={handleInputUpdate}
          calories={calories}
          protein={protein}
          carb={carb}
          fat={fat}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default DailyNutritionGoalsCustomizationModal;
