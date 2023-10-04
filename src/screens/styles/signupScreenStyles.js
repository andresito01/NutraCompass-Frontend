import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const signupScreenStyles = () => {
  const paperTheme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: paperTheme.colors.background,
    },
    gradientContainer: {
      flex: 1,
    },
    contentContainer: {
      margin: 20,
      flex: 1,
      justifyContent: "top",
      marginVertical: 80,
      alignItems: "center",
      flexDirection: "column",
    },
    logo: {
      width: 360,
      height: 100,
      alignSelf: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: paperTheme.colors.primary,
      marginVertical: 16,
    },
    link: {
      color: paperTheme.colors.accent,
      textAlign: "center",
    },
    inputContainer: {
      width: "100%",
    },
    input: {
      backgroundColor: "#f0f0f0", // Grayish background for text inputs
      borderRadius: 8,
      marginBottom: 4,
      paddingHorizontal: 16,
      color: paperTheme.colors.text, // Text color from the theme
    },
    icon: {
      padding: 10,
    },
    datePickerText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      margin: 5,
    },
    button: {
      backgroundColor: paperTheme.colors.primary,
      borderRadius: 24, // Increased border radius for buttons
      paddingVertical: 10, // Adjusted padding for buttons
      marginVertical: 10,
      width: 150, // Adjusted button width
    },
  });
};

export default signupScreenStyles;
