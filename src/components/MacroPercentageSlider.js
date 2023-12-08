import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import Slider from "@react-native-community/slider";
import { useUserSettings } from "../features/userSettings/context/UserSettingsContext.js";

const MacroPercentageSlider = ({ selectedValues, onSelect, calories }) => {
  const paperTheme = useTheme();

  const {
    calculateProteinDailyGrams,
    calculateCarbDailyGrams,
    calculateFatDailyGrams,
  } = useUserSettings();

  // Check if the sum of percentages is equal to 100%
  const isSum100Percent =
    selectedValues.protein + selectedValues.carb + selectedValues.fat === 100;

  // Calculate total daily grams for each macro based on percentage
  const proteinDailyGrams = calculateProteinDailyGrams(
    calories,
    selectedValues.protein
  );
  const carbDailyGrams = calculateCarbDailyGrams(calories, selectedValues.carb);
  const fatDailyGrams = calculateFatDailyGrams(calories, selectedValues.fat);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: paperTheme.colors.surface,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "flex-start",
          gap: 30,
          paddingTop: 20,
        }}
      >
        <View
          style={{
            gap: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 15,
          }}
        >
          <View style={{ alignItems: "flex-start", width: "20%" }}>
            <Text
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: 20,
                padding: 5,
                fontWeight: "bold",
                color: paperTheme.colors.text,
                backgroundColor: "rgba(30,144,255,0.5)",
              }}
            >
              Protein
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 15, paddingRight: 40 }}>
            <Slider
              vertical={true}
              style={{ width: 220, height: 40 }}
              step={5}
              minimumValue={0}
              maximumValue={100}
              value={selectedValues.protein}
              onValueChange={(value) => onSelect("protein", value)}
              minimumTrackTintColor={paperTheme.colors.primary}
              maximumTrackTintColor="#000000"
            />
            <View style={{ gap: 5 }}>
              <Text style={{ color: paperTheme.colors.primary, fontSize: 20 }}>
                {selectedValues.protein}%
              </Text>
              <Text style={{ color: paperTheme.colors.text }}>
                {proteinDailyGrams} g
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            gap: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 15,
          }}
        >
          <View style={{ alignItems: "flex-start", width: "20%" }}>
            <Text
              style={{
                textAlign: "center",
                width: "100%",
                padding: 5,
                fontSize: 20,
                fontWeight: "bold",
                color: paperTheme.colors.text,
                backgroundColor: "rgba(255,165,0,0.5)",
              }}
            >
              Carb
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 15, paddingRight: 40 }}>
            <Slider
              vertical={true}
              style={{ width: 220, height: 40 }}
              step={5}
              minimumValue={0}
              maximumValue={100}
              value={selectedValues.carb}
              onValueChange={(value) => onSelect("carb", value)}
              minimumTrackTintColor={paperTheme.colors.primary}
              maximumTrackTintColor="#000000"
            />
            <View style={{ gap: 5 }}>
              <Text style={{ color: paperTheme.colors.primary, fontSize: 20 }}>
                {selectedValues.carb}%
              </Text>
              <Text style={{ color: paperTheme.colors.text }}>
                {carbDailyGrams} g
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            gap: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 15,
          }}
        >
          <View style={{ alignItems: "flex-start", width: "20%" }}>
            <Text
              style={{
                textAlign: "center",
                width: "100%",
                padding: 5,
                fontSize: 20,
                fontWeight: "bold",
                color: paperTheme.colors.text,
                backgroundColor: "rgba(255,0,0,0.5)",
              }}
            >
              Fat
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 15, paddingRight: 40 }}>
            <Slider
              vertical={true}
              style={{ width: 220, height: 40 }}
              step={5}
              minimumValue={0}
              maximumValue={100}
              value={selectedValues.fat}
              onValueChange={(value) => onSelect("fat", value)}
              minimumTrackTintColor={paperTheme.colors.primary}
              maximumTrackTintColor="#000000"
            />
            <View style={{ gap: 5 }}>
              <Text style={{ color: paperTheme.colors.primary, fontSize: 20 }}>
                {selectedValues.fat}%
              </Text>
              <Text style={{ color: paperTheme.colors.text }}>
                {fatDailyGrams} g
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: paperTheme.colors.background,
            flex: 1,
            flexDirection: "row",
            paddingTop: 20,
            paddingLeft: 25,
          }}
        >
          <View>
            <Text style={{ color: paperTheme.colors.text, fontSize: 16 }}>
              % Total
            </Text>
            <Text style={{ color: paperTheme.colors.text }}>
              Macronutrients must equal 100%
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: isSum100Percent ? paperTheme.colors.primary : "red",
                fontSize: 24,
              }}
            >
              {selectedValues.protein +
                selectedValues.carb +
                selectedValues.fat}
              %
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MacroPercentageSlider;
