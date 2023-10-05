import React from "react";
import { Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "react-native-paper"; // Import useTheme from react-native-paper
import gymScreenStyles from "./styles/gymScreenStyles.js";

export default function GymScreen() {
  const { user } = useAuth();
  const paperTheme = useTheme(); // Get the theme
  const styles = gymScreenStyles(); // Apply your styles

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gym</Text>
    </View>
  );
}
