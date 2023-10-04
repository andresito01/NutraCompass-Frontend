import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const signinScreenStyles = () => {
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
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 8,
      backgroundColor: "#f0f0f0",
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    icon: {
      padding: 10,
    },
    input: {
      backgroundColor: "#f0f0f0", // Grayish background for text inputs
      borderRadius: 8,
      marginBottom: 4,
      paddingHorizontal: 16,
      color: paperTheme.colors.text, // Text color from the theme
    },
    button: {
      backgroundColor: paperTheme.colors.primary,
      borderRadius: 20,
      paddingVertical: 12,
      paddingHorizontal: 24,
      marginTop: 20,
    },
    signupText: {
      color: paperTheme.colors.text,
      fontSize: 16,
      marginTop: 20,
      textAlign: "center",
      marginBottom: 20,
    },
    signupLink: {
      color: paperTheme.colors.accent,
      textDecorationLine: "underline",
    },
  });
};

export default signinScreenStyles;
