import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const mealSectionCustomizationModalStyles = () => {
  const paperTheme = useTheme();

  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent", // transparent background
    },
    modalContent: {
      flex: 1,
      width: "100%", // Adjust the width
      minHeight: "97%", // Adjust the height
      backgroundColor: paperTheme.colors.background, // Use theme background color
      padding: 20,
    },
    modalButtonHeader: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalTitle: {
      marginTop: 20,
      marginBottom: 5,
      fontSize: 24,
      color: paperTheme.colors.text, // Use theme text color
      fontWeight: "bold",
      alignSelf: "center",
    },
    sectionRow: {
      ...paperTheme.shadows.small,
      backgroundColor: "transparent",
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      marginTop: 2,
      marginBottom: 2,
      marginRight: 10,
      elevation: 6,
    },
    sectionIdText: {
      color: paperTheme.colors.text,
      fontSize: 18,
    },
    sectionIdTextNoValue: {
      color: "rgba(0, 0, 0, 0.7)", // Light gray color for
      fontSize: 18,
    },
    sectionInputText: {
      color: paperTheme.colors.primary,
      fontSize: 18,
    },
    sectionInputTextNoValue: {
      color: "rgba(0, 0, 0, 0.7)", // Light gray color for
      fontSize: 18,
    },
  });
};

export default mealSectionCustomizationModalStyles;
