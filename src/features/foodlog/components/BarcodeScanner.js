import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons"; // Import the desired icon

const BarcodeScanner = ({ onBarcodeScanned, onClose }) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const handleBarcodeScanned = ({ data }) => {
    // Pass the scanned barcode data to the callback
    onBarcodeScanned(data);
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

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        onBarCodeScanned={handleBarcodeScanned}
      >
        {/* Target area for scanning barcodes */}
        <View style={styles.targetArea} />
        {/* Close button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialIcons name="keyboard-arrow-left" size={40} color="white" />
        </TouchableOpacity>
        {/* Flip camera button */}
        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
          <MaterialIcons name="rotate-right" size={40} color="white" />
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  targetArea: {
    position: "absolute",
    top: "30%",
    left: "15%",
    width: "70%",
    height: "40%",
    borderColor: "green",
    borderWidth: 2,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  flipButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
});

export default BarcodeScanner;
