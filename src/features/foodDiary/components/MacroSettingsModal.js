import React, { useState } from "react";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import { Button, useTheme } from "react-native-paper";
import Modal from "react-native-modal";
import Feather from "react-native-vector-icons/Feather";
import MacroPercentageSlider from "../../../components/MacroPercentageSlider.js";

const MacroSettingsModal = ({
  isVisible,
  closeModal,
  tempChanges,
  setTempChanges,
  setActiveField,
  handleInputChange,
  handleInputUpdate,
  calories,
  protein,
  carb,
  fat,
}) => {
  const paperTheme = useTheme();

  // Convert tempChanges fields to numbers

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

  console.log("Numeric Protein: ", numericProtein);
  console.log("Numeric Carb: ", numericCarb);
  console.log("Numeric Fat: ", numericFat);
  console.log("IsSum100Percent: ", isSum100Percent);
  console.log(
    "Macro Percentage Sum: ",
    numericProtein + numericCarb + numericFat
  );

  // console.log("tempChanges Type Check", typeof protein);

  return (
    <Modal
      coverScreen={false}
      onBackdropPress={closeModal}
      isVisible={isVisible}
      style={{
        width: "100%",
        top: "50%",
        bottom: 0,
        margin: 0,
        backgroundColor: "red",
        justifyContent: "center",
      }}
      avoidKeyboard={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={400}
      animationOutTiming={400}
    >
      <View style={{ flex: 1 }}>
        {/* First child View */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
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
              closeModal();
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
            {/* {activeField
              ? activeField.charAt(0).toUpperCase() + activeField.slice(1)
              : ""} */}
            Macros
          </Text>

          <TouchableOpacity
            onPress={() => {
              handleInputUpdate();
              closeModal();
            }}
            style={{
              flex: 1,
              alignItems: "center",
              opacity: isSum100Percent ? 1 : 0.5,
            }}
            disabled={!isSum100Percent} // Disable the button if condition is not met
          >
            <Feather name="check" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Second child View containing PercentageSlider */}
        <View style={{ flex: 1 }}>
          <MacroPercentageSlider
            selectedValues={{
              protein:
                tempChanges.protein !== undefined
                  ? parseFloat(tempChanges.protein)
                  : protein,
              carb:
                tempChanges.carb !== undefined
                  ? parseFloat(tempChanges.carb)
                  : carb,
              fat:
                tempChanges.fat !== undefined
                  ? parseFloat(tempChanges.fat)
                  : fat,
            }}
            onSelect={(field, value) => handleInputChange(field, value)}
            calories={calories}
          />
        </View>
      </View>
    </Modal>
  );
};

export default MacroSettingsModal;
