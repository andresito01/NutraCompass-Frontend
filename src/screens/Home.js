import React from "react";
import { Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "react-native-paper"; // Import useTheme from react-native-paper
import { LinearGradient } from "expo-linear-gradient";
import homeScreenStyles from "./styles/homeScreenStyles"; // Import your styles

export default function HomeScreen() {
  const { user } = useAuth();
  const paperTheme = useTheme(); // Get the theme
  const styles = homeScreenStyles(); // Apply your styles

  return (
    <LinearGradient // Use LinearGradient as the root component
      colors={[paperTheme.colors.gradientStart, paperTheme.colors.gradientEnd]}
      locations={[0.5, 1]} // Control the position of the gradient colors
      style={styles.container}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.text}>Welcome {user?.email}!</Text>
      </View>
    </LinearGradient>
  );
}
