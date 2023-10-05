import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
} from "react-native-paper";

export const CustomDefaultTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#239B56", // Green color
    accent: "#FF0000", // Red color
    background: "#FFFFFF", // Light background color (white)
    border: "rgba(0, 0, 0, 0.1)", // Semi-transparent shadow border for light theme
    text: "#000000", // Set text color to black for light mode
    bottomNavText: "#FFFFFF", // Set text color to white for light mode
    gradientStart: "rgba(0, 0, 0, 0)", // Use transparent color for gradient start
    gradientEnd: "#2ECC71",
  },
  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2, // Elevation for Android
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4, // Elevation for Android
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6, // Elevation for Android
    },
  },
};

export const CustomDarkTheme = {
  ...DarkTheme,
  roundness: 2,
  colors: {
    ...DarkTheme.colors,
    primary: "#239B56", // Green color
    accent: "#FF0000", // Red color
    background: "#121212", // Dark background color
    border: "rgba(255, 255, 255, 0.1)", // Semi-transparent shadow border for dark theme
    text: "#FFFFFF", // Set text color to white for dark mode
    bottomNavText: "#000000", // Set text color to black for dark mode
    gradientStart: "rgba(0, 0, 0, 0)", // Use transparent color for gradient start
    gradientEnd: "#2ECC71",
  },
  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2, // Elevation for Android
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4, // Elevation for Android
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6, // Elevation for Android
    },
  },
};

export const FoodLogTheme = {
  roundness: 4, // You can adjust this roundness value as needed
  colors: {
    primary: "#6200ea", // Adjust this primary color
    accent: "#03dac6", // Adjust this accent color
    background: "#f6f6f6", // Adjust this background color
    text: "#333333", // Adjust this text color
    gradientStart: "rgba(0, 0, 0, 0)",
    gradientEnd: "#2ECC71",
  },
};
