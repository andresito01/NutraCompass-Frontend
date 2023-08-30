import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
// Edamam Food Database API Method Imports
import { searchFoodByBarcode } from "../api/EdamamFoodDatabaseAPI/edamamMethods.js";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"; // Import the desired icon
const BarcodeScanner = ({ onBarcodeScanned, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [manualBarcode, setManualBarcode] = useState("");
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  // Food search using Barcode scanning
  const handleBarcodeScanned = async ({ data }) => {
    try {
      // Show loading indicator while scanning
      setLoading(true);

      const foodBarcodeResults = await searchFoodByBarcode(data);

      if (foodBarcodeResults === undefined) {
        // Display error message for unrecognized barcode
        setError("Barcode not recognized. Please try again or enter manually.");
      } else {
        // Pass the successfully scanned barcode data to the callback
        onBarcodeScanned(foodBarcodeResults.hints);
      }
    } catch (error) {
      console.error("Barcode scanner error: ", error);
      setError("An error occurred while scanning. Please try again.");
    } finally {
      // Hide loading indicator
      setLoading(false);
    }
  };

  // Food search using manual barcode input
  const handleManualSearch = async () => {
    try {
      // Show loading indicator while searching
      setLoading(true);

      const foodBarcodeResults = await searchFoodByBarcode(manualBarcode);

      if (foodBarcodeResults === undefined) {
        // Display error message for unrecognized barcode
        setError("Barcode not recognized. Please try again.");
      } else {
        // Pass the successfully scanned barcode data to the callback
        onBarcodeScanned(foodBarcodeResults.hints);
      }
    } catch (error) {
      console.error("Manual barcode search error: ", error);
      setError("An error occurred while searching. Please try again.");
    } finally {
      // Hide loading indicator
      setLoading(false);
    }
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (!permission) {
    console.log("permission not set");
    // Camera permissions are still loading
    return <View />;
  }
  if (!permission.granted) {
    console.log("permission is set");
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleTextInputFocus = () => {
    // Handle focus event of the TextInput
    // You can hide the instruction text and target area here
    setIsTextInputFocused(true);
  };

  const handleTextInputBlur = () => {
    // Handle blur event of the TextInput
    // You can show the instruction text and target area here
    setIsTextInputFocused(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Camera
        style={styles.camera}
        type={type}
        onBarCodeScanned={loading ? undefined : handleBarcodeScanned}
      >
        {/* Translucent gray boxes (masks) */}
        <View style={styles.maskTop} />
        <View style={styles.maskLeft} />
        <View style={styles.maskRight} />
        <View style={styles.maskBottom} />

        {/* Clear overlay with conditional tinting */}
        <View
          style={[
            styles.targetAreaClearOverlay,
            isTextInputFocused && styles.targetAreaTintedOverlay,
          ]}
        />

        {!isTextInputFocused && (
          <React.Fragment>
            {/* Scan Barcode Instruction Text */}
            <View style={styles.scanbarCodeInstructionsContainer}>
              <Text style={styles.scanText}>Scan Barcode</Text>
              <Text style={styles.instructionText}>
                Keep the barcode in the frame to scan it
              </Text>
            </View>

            {/* Target area for scanning barcodes */}
            <View style={styles.targetArea}>
              <View style={styles.targetBorder} />
            </View>
          </React.Fragment>
        )}

        {/* Close button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialIcons name="keyboard-arrow-left" size={40} color="white" />
        </TouchableOpacity>

        {/* Flip camera button */}
        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
          <MaterialIcons name="rotate-right" size={40} color="white" />
        </TouchableOpacity>

        {/* Manual barcode input */}
        <View style={styles.manualInputContainer}>
          <FontAwesome
            name="barcode"
            size={20}
            color="white"
            style={styles.barcodeIcon}
          />
          <TextInput
            style={styles.manualInput}
            placeholder="Manually Enter Barcode"
            placeholderTextColor="white"
            value={manualBarcode}
            onChangeText={setManualBarcode}
            onFocus={handleTextInputFocus}
            onBlur={handleTextInputBlur}
          />
          <TouchableOpacity
            style={styles.manualSearchButton}
            onPress={handleManualSearch}
          >
            <MaterialIcons name="check" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>

      {/* Loading indicator */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="black"
          style={styles.loadingIndicator}
        />
      )}

      {/* Error message */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#0e1529", // Adjust background color as needed
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
    color: "white", // Text color
  },
  manualSearchButton: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: "#007BFF", // Adjust background color as needed
    marginLeft: 10,
  },
  manualSearchButtonText: {
    color: "white",
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

export default BarcodeScanner;
