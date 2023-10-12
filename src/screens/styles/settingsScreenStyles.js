import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const settingsScreenStyles = () => {
  const paperTheme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0,
      paddingBottom: 30,
      backgroundColor: paperTheme.colors.background,
    },
    header: {
      height: 45,
      minWidth: "100%",
      padding: 10,
      justifyContent: "flex-end",
    },
    row: {
      backgroundColor: paperTheme.colors.background,
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      marginTop: 0,
      margin: 5,
    },
    text: {
      color: paperTheme.colors.text,
      fontSize: 18,
      marginLeft: 12,
    },
  });
};

export default settingsScreenStyles;
