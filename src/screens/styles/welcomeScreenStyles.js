import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const welcomeScreenStyles = () => {
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
      marginHorizontal: 20,
      flex: 1,
      justifyContent: "top",
      marginVertical: 60,
      alignItems: "center",
      flexDirection: "column",
      paddingTop: 40,
    },
    appName: {
      fontSize: 28, // Increased font size for app name
      fontWeight: "bold",
      color: paperTheme.colors.primary,
      marginVertical: 16,
      textAlign: "center",
    },
    description: {
      color: paperTheme.colors.text,
      fontSize: 18, // Increased font size for description
      textAlign: "center",
      marginHorizontal: 16,
      marginBottom: 24, // Increased margin to separate from buttons
    },
    buttonContainer: {
      justifyContent: "center",
      alignItems: "center",
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

export default welcomeScreenStyles;
