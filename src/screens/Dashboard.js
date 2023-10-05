import React from "react";
import { Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "react-native-paper"; // Import useTheme from react-native-paper
import dashboardScreenStyles from "./styles/dashboardScreenStyles.js"; // Import your styles

export default function DashboardScreen() {
  const { user } = useAuth();
  const paperTheme = useTheme(); // Get the theme
  const styles = dashboardScreenStyles(); // Apply your styles

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard</Text>
    </View>
  );
}
