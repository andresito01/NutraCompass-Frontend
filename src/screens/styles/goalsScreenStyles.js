import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const goalsScreenStyles = () => {
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
    navigateToMoreButton: {
      alignSelf: "flex-start",
    },
    row: {
      ...paperTheme.shadows.small,
      backgroundColor: paperTheme.colors.background,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
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

export default goalsScreenStyles;
