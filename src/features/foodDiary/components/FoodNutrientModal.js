// FoodNutrientModal.js
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput, useTheme, Appbar } from "react-native-paper";
import Modal from "react-native-modal";
import Feather from "react-native-vector-icons/Feather";
import foodNutrientModalStyles from "./styles/foodNutrientModalStyles.js";
import Svg, { Circle, G, Text as SvgText, Path } from "react-native-svg";

const FoodNutrientModal = ({ isVisible, closeModal }) => {
  const styles = foodNutrientModalStyles();
  const paperTheme = useTheme();

  const renderCircularChart = (
    carbsPercentage,
    fatPercentage,
    proteinPercentage,
    calories
  ) => {
    const chartData = [
      { percentage: carbsPercentage, color: "orange", label: "Carbs" },
      { percentage: fatPercentage, color: "red", label: "Fat" },
      { percentage: proteinPercentage, color: "green", label: "Protein" },
    ];

    const radius = 60;
    const circumference = 2 * Math.PI * radius;

    let currentAngle = 0;

    return (
      <Svg height="120" width="120">
        <G transform={{ translate: `${radius}, ${radius}` }}>
          {chartData.map((segment, index) => {
            const angle = (segment.percentage * 360) / 100;
            const path = `M 0 0 L ${
              radius * Math.cos((currentAngle * Math.PI) / 180)
            } ${
              radius * Math.sin((currentAngle * Math.PI) / 180)
            } A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${
              radius * Math.cos(((currentAngle + angle) * Math.PI) / 180)
            } ${radius * Math.sin(((currentAngle + angle) * Math.PI) / 180)} Z`;
            currentAngle += angle;

            return <Path key={index} d={path} fill={segment.color} />;
          })}
          <Circle r={radius - 10} fill={paperTheme.colors.surface} />
          <SvgText
            fill={paperTheme.colors.text}
            fontSize="20"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {calories}
          </SvgText>
        </G>
      </Svg>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      style={styles.container}
      avoidKeyboard={true}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <Appbar.Header style={styles.header}>
            <Appbar.Action
              icon="arrow-left"
              onPress={closeModal}
              color="white"
            />
            <Appbar.Content title="Edit Entry" titleStyle={styles.title} />
            <Appbar.Action icon="check" onPress={closeModal} color="white" />
          </Appbar.Header>
          <View style={{ flex: 1, backgroundColor: paperTheme.colors.primary }}>
            {/* Food Item Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.foodItemName}>Food Item Name</Text>
              <Text style={styles.brandCompany}>Brand/Company</Text>
            </View>
            {/* Input Fields Section */}
            <View style={styles.sectionContainer}>
              <Row label="Serving Size" />
              <Row label="Number of Servings" keyboardType="numeric" />
              <Row label="Meal" />
              {renderCircularChart(40, 30, 30, 500)}
              {/* Example data, replace with actual values */}
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const Row = ({ label, keyboardType }) => {
  const styles = foodNutrientModalStyles();

  return (
    <View style={styles.rowContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput keyboardType={keyboardType} style={styles.textInput} />
    </View>
  );
};

export default FoodNutrientModal;
