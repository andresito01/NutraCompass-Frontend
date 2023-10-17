import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const foodEntryModalStyles = () => {
  const paperTheme = useTheme();

  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent", // transparent background
    },
    modalHeader: {
      padding: 0,
      backgroundColor: paperTheme.colors.background,
      width: "100%",
    },
    modalContent: {
      flex: 1,
      width: "100%", // Adjust the width
      // minHeight: "97%", // Adjust the height
      // maxHeight: "100%", // Set the maximum height of the modal
      backgroundColor: paperTheme.colors.background, // Use theme background color
      padding: 20,
      // borderColor: paperTheme.colors.primary, // Use theme primary color for border
      // borderWidth: 2,
      //shadowColor: paperTheme.colors.text, // Use theme text color for shadow
      // shadowOpacity: 0.5,
      // shadowRadius: 5,
      // shadowOffset: {
      //   width: 0,
      //   height: 0,
      // },
    },
    flatlist: {
      flex: 1,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
      color: paperTheme.colors.text, // Use theme text color
    },
    input: {
      borderWidth: 1,
      borderColor: paperTheme.colors.primary, // Use theme primary color for border
      color: paperTheme.colors.text, // Use theme text color
      padding: 10,
      marginBottom: 12,
      width: "100%", // Adjust the width
      borderRadius: 4,
    },
    modalButton: {
      backgroundColor: paperTheme.colors.primary, // Use theme primary color
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 4,
      marginBottom: 12,
      marginTop: 12,
    },
    modalButtonText: {
      color: paperTheme.colors.text, // Use theme text color
      fontWeight: "bold",
    },
    foodItemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: paperTheme.colors.surface, // Use theme surface color
      elevation: 4,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 6,
      borderRadius: 8,
    },
    foodInfoContainer: {
      flex: 1,
      marginRight: 12,
    },
    foodLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: paperTheme.colors.text, // Use theme text color
    },
    foodLabelCalories: {
      fontSize: 14,
      color: paperTheme.colors.text, // Use theme text color
    },
    foodLabelServingSize: {
      fontSize: 14,
      color: paperTheme.colors.text, // Use theme text color
    },
    selectButton: {
      backgroundColor: paperTheme.colors.primary, // Use theme primary color
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 4,
    },
    barcodeScannerContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  });
};

export default foodEntryModalStyles;
