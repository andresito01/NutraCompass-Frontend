import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Vibration,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
// Edamam Food Database API Method Imports
import { searchFoodByBarcode } from "../api/EdamamFoodDatabaseAPI/edamamMethods.js";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"; // Import the desired icon
import barcodeScannerStyles from "./styles/barcodeScannerStyles.js";
import { useTheme } from "react-native-paper";

const BarcodeScanner = ({ onBarcodeScanned, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [manualBarcode, setManualBarcode] = useState("");
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const styles = barcodeScannerStyles();
  paperTheme = useTheme();

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
        Vibration.vibrate();
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
            color={paperTheme.colors.text}
            style={styles.barcodeIcon}
          />
          <TextInput
            style={styles.manualInput}
            placeholder="Manually Enter Barcode"
            placeholderTextColor={paperTheme.colors.text}
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

export default BarcodeScanner;
