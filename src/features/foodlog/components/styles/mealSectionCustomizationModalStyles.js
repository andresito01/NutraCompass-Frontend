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
      // borderColor: paperTheme.colors.primary, // Use theme primary color for border
      // borderWidth: 2,
      shadowColor: paperTheme.colors.text, // Use theme text color for shadow
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 0,
      },
    },
    modalButtonHeader: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    formContainer: {
      backgroundColor: paperTheme.colors.background,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      marginTop: 20,
      marginBottom: 20,
      elevation: 4,
    },
    formFieldContainer: {
      ...paperTheme.shadows.small,
      backgroundColor: paperTheme.colors.background,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      padding: 5,
      elevation: 2,
    },
    formMealInput: {
      color: paperTheme.colors.text,
      alignSelf: "flex-start",
      textAlign: "center",
      fontSize: 14,
      height: "100%",
      width: "80%",
      marginLeft: 5,
      marginRight: 5,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "gray",
      backgroundColor: paperTheme.colors.surface,
    },
    addMealSectionButton: {
      alignSelf: "flex-end",
      padding: 10,
      height: "100%",
      width: "15%",
      alignItem: "center",
    },
    mealSectionContainer: {
      ...paperTheme.shadows.large,
      backgroundColor: "transparent",
      flex: 1,
      marginBottom: 10,
      elevation: 2,
    },
    formTitle: {
      fontSize: 18,
      color: paperTheme.colors.text, // Use theme text color
      fontWeight: "bold",
      marginBottom: 10,
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
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      marginTop: 10,
      marginBottom: 10,
      marginRight: 10,
      elevation: 6,
    },
    deleteSectionButton: {
      marginLeft: 0,
      paddingTop: 5,
      paddingRight: 10,
      paddingBottom: 10,
    },
    sectionOrder: {
      color: paperTheme.colors.text,
      fontSize: 18,
    },
    sectionInput: {
      color: paperTheme.colors.text,
      fontSize: 18,
    },
    sectionMoveToggle: {
      alignItems: "center",
      justifyContent: "center",
    },
  });
};

export default mealSectionCustomizationModalStyles;
