// foodNutrientModalStyles.js
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const foodNutrientModalStyles = () => {
  const paperTheme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: paperTheme.colors.background,
      margin: 0,
    },
    header: {
      backgroundColor: paperTheme.colors.background,
      height: 40,
    },
    title: {
      color: "white",
    },
    sectionContainer: {
      padding: 16,
      backgroundColor: paperTheme.colors.surface,
      marginBottom: 1,
    },
    foodItemName: {
      color: paperTheme.colors.text,
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 8,
    },
    brandCompany: {
      color: paperTheme.colors.text,
      marginBottom: 16,
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    inputLabel: {
      color: paperTheme.colors.text,
      fontSize: 16,
      fontWeight: "bold",
      marginRight: 16,
      flex: 1,
    },
    textInput: {
      flex: 0.5, // Occupies about a quarter of the row width
      backgroundColor: "white",
      fontSize: 16,
      height: 40,
    },
  });
};

export default foodNutrientModalStyles;
