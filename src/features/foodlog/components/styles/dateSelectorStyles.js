import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const dateSelectorStyles = () => {
  const paperTheme = useTheme();

  return StyleSheet.create({
    headerDateContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 5,
    },
    date: {
      paddingLeft: 10,
      fontSize: 18,
      fontWeight: "bold",
      color: paperTheme.colors.text,
    },
    calendarModal: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: paperTheme.colors.background,
    },
    calendarWrapper: {
      width: "85%",
      backgroundColor: paperTheme.colors.background,
    },
    cancelDateButton: {
      padding: 15,
    },
    cancelDateButtonText: {
      color: paperTheme.colors.text,
      textAlign: "center",
    },
    calendarModalButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    section: {
      marginBottom: 12, // Reduce marginBottom for smaller sections
      borderRadius: paperTheme.roundness,
      backgroundColor: paperTheme.colors.surface, // Change to surface color for cards
      elevation: 2, // Add elevation for a card-like effect
    },
    sectionHeaderContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 0, // Reduce padding for smaller header
    },
    dateInfo: {
      alignSelf: "center",
      marginTop: 4, // Reduce marginTop for date info
      fontWeight: "bold",
      color: paperTheme.colors.text,
    },
  });
};

export default dateSelectorStyles;
