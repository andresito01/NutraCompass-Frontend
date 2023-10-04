import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const barcodeScannerStyles = () => {
  const paperTheme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      backgroundColor: "white", // Set the background color of the camera screen
    },
    camera: {
      flex: 1,
    },
    maskTop: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "30%", // Adjust the height as needed
      backgroundColor: "rgba(0, 0, 0, 0.7)", // Translucent gray
      zIndex: 1,
    },
    maskLeft: {
      position: "absolute",
      top: "30%",
      left: 0,
      width: "15%", // Adjust the width as needed
      height: "40%", // Adjust the height as needed
      backgroundColor: "rgba(0, 0, 0, 0.7)", // Translucent gray
      zIndex: 1,
    },
    maskRight: {
      position: "absolute",
      top: "30%",
      right: 0,
      width: "15%", // Adjust the width as needed
      height: "40%", // Adjust the height as needed
      backgroundColor: "rgba(0, 0, 0, 0.7)", // Translucent gray
      zIndex: 1,
    },
    maskBottom: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "30%", // Adjust the height as needed
      backgroundColor: "rgba(0, 0, 0, 0.7)", // Translucent gray
      zIndex: 1,
    },
    targetAreaClearOverlay: {
      top: "30%",
      left: "15%",
      width: "70%",
      height: "40%",
      backgroundColor: "rgba(0, 0, 0, 0.0)",
      zIndex: 2,
    },
    targetAreaTintedOverlay: {
      top: "30%",
      left: "15%",
      width: "70%",
      height: "40%",
      backgroundColor: "rgba(0, 0, 0, 0.7)", // Translucent gray
      zIndex: 2,
    },
    targetArea: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "30%",
      left: "15%",
      width: "70%",
      height: "40%",
      zIndex: 2,
    },
    targetBorder: {
      borderWidth: 2,
      borderColor: "white", // Adjust border color as needed
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
    },
    scanbarCodeInstructionsContainer: {
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "14%",
      left: "15%",
      width: "70%",
      zIndex: 2,
    },
    scanText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white", // Adjust text color as needed
      marginBottom: 10,
    },
    instructionText: {
      fontSize: 16,
      color: "white", // Adjust text color as needed
    },
    closeButton: {
      position: "absolute",
      top: 40,
      left: 20,
      zIndex: 2,
    },
    flipButton: {
      position: "absolute",
      top: 40,
      right: 20,
      zIndex: 2,
    },
    manualInputContainer: {
      position: "absolute",
      flexDirection: "row",
      alignItems: "center",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 10,
      backgroundColor: paperTheme.colors.background, // Adjust background color as needed
      zIndex: 2,
    },
    barcodeIcon: {
      marginRight: 10,
    },
    manualInput: {
      flex: 1,
      height: 45,
      borderRadius: 4,
      backgroundColor: "transparent",
      paddingHorizontal: 10,
      fontSize: 20,
      color: paperTheme.colors.text, // Text color
    },
    manualSearchButton: {
      padding: 10,
      borderRadius: 4,
      backgroundColor: paperTheme.colors.primary, // Adjust background color as needed
      marginLeft: 10,
    },
    manualSearchButtonText: {
      color: paperTheme.colors.text,
      fontSize: 16,
      fontWeight: "bold",
    },
    loadingIndicator: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      position: "absolute",
      top: "75%",
      left: 20,
      justifyContent: "center",
      alignItems: "center",
      color: "red", // Adjust error text color as needed
    },
  });
};

export default barcodeScannerStyles;
