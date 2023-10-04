import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const foodlogScreenStyles = () => {
  const paperTheme = useTheme();

  return StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: paperTheme.colors.background,
    },
    scrollViewContainer: {
      flex: 1,
      paddingTop: 5,
      paddingLeft: 5,
      paddingRight: 5,
      backgroundColor: paperTheme.colors.background,
    },
    scrollViewContainerContent: {
      flexGrow: 1,
    },
    headerSection: {
      marginBottom: 7, // Reduce marginBottom for smaller sections
      borderRadius: paperTheme.roundness,
      backgroundColor: paperTheme.colors.surface, // Change to surface color for cards
      elevation: 2, // Add elevation for a card-like effect
    },
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
    totalDayCalories: {
      fontSize: 18,
      paddingTop: 12, // Increase padding for better spacing
      color: paperTheme.colors.text,
    },
    totalDayCaloriesProgressSectionText: {
      fontSize: 14,
      paddingTop: 12, // Increase padding for better spacing
      color: paperTheme.colors.text,
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
    mealSectionHeaderContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 5,
      padding: 2, // Reduce padding for smaller header
      borderBottomWidth: 5,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderBottomColor: paperTheme.colors.border, // Use divider color for separation
    },
    sectionTitle: {
      fontSize: 18, // Reduce fontSize for the section title
      fontWeight: "bold",
      color: paperTheme.colors.text,
    },
    addButton: {
      marginTop: 20,
      width: "31%",
    },
    totalMealSectionCalories: {
      marginTop: 4, // Reduce marginTop for total calories
      fontSize: 18,
      color: paperTheme.colors.text,
    },
    dateInfo: {
      alignSelf: "center",
      marginTop: 4, // Reduce marginTop for date info
      fontWeight: "bold",
      color: paperTheme.colors.text,
    },
  });
};

export default foodlogScreenStyles;
