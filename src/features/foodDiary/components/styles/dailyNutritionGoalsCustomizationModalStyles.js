import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const dailyNutritionGoalsCustomizationModalStyles = () => {
  const paperTheme = useTheme();

  return StyleSheet.create({
    header: {
      height: 65,
      minWidth: "100%",
      padding: 10,
      justifyContent: "flex-end",
    },
    closeModalButton: {
      alignSelf: "flex-start",
      marginTop: 20,
    },
    formContainer: {
      top: 30,
      width: "80%",
      backgroundColor: paperTheme.colors.surface,
      padding: 20,
      borderRadius: 8,
      justifyContent: "center",
    },
    inputRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    label: {
      color: paperTheme.colors.text,
    },
    input: {
      width: "50%",
      height: 40,
      marginBottom: 10,
      color: paperTheme.colors.primary,
      backgroundColor: paperTheme.colors.background,
      textAlign: "center",
    },
    macroInputContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    inputText: {
      color: paperTheme.colors.primary,
    },
  });
};

export default dailyNutritionGoalsCustomizationModalStyles;
