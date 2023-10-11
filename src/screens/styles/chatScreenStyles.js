import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const chatScreenStyles = () => {
  const paperTheme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: paperTheme.colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: paperTheme.colors.text,
      fontSize: 24,
      textAlign: "center",
    },
    navigateToGymButton: {
      position: "absolute",
      top: 20,
      left: 20,
    },
  });
};

export default chatScreenStyles;
