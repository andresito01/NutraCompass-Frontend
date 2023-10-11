import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const gymScreenStyles = () => {
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
    navigateToChatButton: {
      position: "absolute",
      top: 20,
      right: 20,
    },
  });
};

export default gymScreenStyles;
