import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const settingsScreenStyles = () => {
  const paperTheme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
      paddingBottom: 30,
      backgroundColor: paperTheme.colors.background,
    },
    modalContent: {
      flex: 1,
      borderRadius: 20,
    },
    row: {
      backgroundColor: paperTheme.colors.background,
      flexDirection: "row",
      alignItems: "center",
      margin: 5,
    },
    text: {
      fontSize: 18,
      marginLeft: 12,
    },
  });
};

export default settingsScreenStyles;
