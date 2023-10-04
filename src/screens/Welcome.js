import React from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme, Button } from "react-native-paper"; // Import Button component
import ThemeChanger from "../components/ThemeChanger.js";
import welcomeScreenStyles from "./styles/welcomeScreenStyles.js";

function WelcomeScreen({ navigation }) {
  const styles = welcomeScreenStyles(); // Use the imported styles
  const paperTheme = useTheme();

  return (
    <View style={styles.container}>
      <ThemeChanger />
      <LinearGradient
        colors={[
          paperTheme.colors.gradientStart,
          paperTheme.colors.gradientEnd,
        ]}
        locations={[0.5, 1]} // Control the position of the gradient colors
        style={styles.gradientContainer}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.appName}>NutraCompass</Text>
          <Text style={styles.description}>
            Achieve your fitness and health goals with this all-in-one guide and
            application to manage and track various metrics.
          </Text>
          <Button
            mode="contained"
            style={styles.button}
            labelStyle={{ color: "white", fontSize: 18, fontWeight: "bold" }} // Style the button text
            onPress={() => navigation.navigate("Sign In")}
          >
            Sign In
          </Button>
          <Button
            mode="outlined"
            style={styles.button}
            labelStyle={{ color: "white", fontSize: 18, fontWeight: "bold" }} // Style the button text
            onPress={() => navigation.navigate("Sign Up")}
          >
            Sign Up
          </Button>
        </View>
      </LinearGradient>
    </View>
  );
}

export default WelcomeScreen;
