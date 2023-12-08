import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const swipeableFoodEntryItemStyles = (SCREEN_WIDTH) => {
  const paperTheme = useTheme();

  return StyleSheet.create({
    containerStyle: {
      flex: 1,
      flexDirection: "row",
      marginBottom: 0,
      marginHorizontal: 5,
      marginTop: 10,
      elevation: 3,
    },
    textContainer: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      //width: SCREEN_WIDTH / 1.2,
      flex: 1,
      borderRadius: 7,
      backgroundColor: paperTheme.colors.background,
      elevation: 3,
      zIndex: 2,
    },
    textStyle: {
      fontSize: 16,
    },
    entryInfo: {
      flex: 1, // Take up all available space
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    entryFoodNameText: {
      color: paperTheme.colors.text,
      fontSize: 16,
      fontWeight: "bold",
    },
    entryCaloriesText: {
      color: paperTheme.colors.text,
      fontSize: 16,
    },
    rightButtonContainer: {
      position: "absolute",
      left: SCREEN_WIDTH / 1.24,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 5,
      borderRadius: 7,
      paddingHorizontal: 18,
      paddingVertical: 10,
      elevation: 3,
      backgroundColor: "#D50000",
      zIndex: 1,
    },
  });
};

export default swipeableFoodEntryItemStyles;
