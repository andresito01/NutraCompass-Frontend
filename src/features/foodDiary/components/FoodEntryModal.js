import React, { useState, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTheme, Appbar, Searchbar, Card, Button } from "react-native-paper";
// Import for console log readability of fetched data objects
import prettyFormat from "pretty-format";
import Feather from "react-native-vector-icons/Feather";
import foodEntryModalStyles from "./styles/foodEntryModalStyles.js";
// Edamam Food Database API Method Imports
import {
  searchFood,
  searchForFoodItemNutrients,
} from "../api/EdamamFoodDatabaseAPI/edamamMethods.js";
// Import Barcode Scanner Component
import BarcodeScanner from "./BarcodeScanner.js";

const FoodEntryModal = ({
  isVisible,
  onSave,
  onCancel,
  handleOpenFoodNutrientModal,
}) => {
  const [foodName, setFoodName] = useState("");
  const foodNameInputRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isBarcodeScannerVisible, setIsBarcodeScannerVisible] = useState(false);

  const styles = foodEntryModalStyles();
  const paperTheme = useTheme(); // Get the current theme

  // const handleSave = () => {
  //   onSave(foodName, parseInt(calories));
  //   setFoodName("");
  //   setCalories("");
  // };

  const handleBarcodeScanned = (resultsOrErrorMessage) => {
    if (Array.isArray(resultsOrErrorMessage)) {
      // Handle successful barcode scanning and set the search results
      setSearchResults(resultsOrErrorMessage);
      setIsBarcodeScannerVisible(false);
    } else {
      // Handle error from barcode scanning and show the error message
      console.log("FoodEntryModal: ", resultsOrErrorMessage);
    }
  };

  const handleFoodSearch = async () => {
    Keyboard.dismiss(); // Dismiss the keyboard
    try {
      const foodSearchResults = await searchFood(foodName);

      // Clean foodSearchResults to ensure there are no unique Id duplicates
      // Create a map to store unique items based on foodId
      const uniqueResultsMap = new Map();
      // Iterate through the searchResults and store unique items in the map
      foodSearchResults.hints.forEach((item) => {
        if (!uniqueResultsMap.has(item.food.foodId)) {
          uniqueResultsMap.set(item.food.foodId, item);
        }
      });
      // Convert the map values back to an array
      const uniqueResults = Array.from(uniqueResultsMap.values());
      // Update the state with the cleaned and unique results
      setSearchResults(uniqueResults);
    } catch (error) {
      console.error("Data processing error:", error);
      // Handle error (e.g., display an error message)
    }
  };

  const handleSelectFood = async (selectedFood) => {
    // Process the selected food and add it to the log
    // For example:

    //console.log("Selected Food: \n" + JSON.stringify(selectedFood));

    onSave(
      selectedFood.food.label,
      parseInt(Math.round(selectedFood.food.nutrients.ENERC_KCAL))
    );
    setSearchResults([]); // Clear search results
    setFoodName(""); // Clear input
    //setCalories(""); // Clear input
  };

  const handleCloseModal = () => {
    setSearchResults([]); // Clear search results
    setFoodName(""); // Clear food name input
    onCancel(); // Close the modal
  };

  const openBarcodeScanner = () => {
    setIsBarcodeScannerVisible(true);
  };

  const closeBarcodeScanner = () => {
    setIsBarcodeScannerVisible(false);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Appbar.Header
              mode="center-aligned"
              style={{
                height: 45,
                backgroundColor: paperTheme.colors.background,
              }}
            >
              <Appbar.BackAction
                color={paperTheme.colors.text}
                onPress={handleCloseModal}
              />
              <Appbar.Content title="Add Food" />
            </Appbar.Header>
          </View>
          <View style={styles.modalContent}>
            <Searchbar
              ref={foodNameInputRef}
              placeholder="Search for a food"
              placeholderTextColor={paperTheme.colors.text}
              //style={styles.input}
              value={foodName}
              onChangeText={setFoodName}
              onIconPress={handleFoodSearch} // Trigger search on icon press
              onSubmitEditing={handleFoodSearch}
              mode="bar"
            />
            <Card
              style={{
                backgroundColor: "transparent",
                alignItems: "flex-start",
              }}
            >
              <Card.Actions>
                <Button>All</Button>
                <Button>My Meals</Button>
              </Card.Actions>
            </Card>
            <Card
              style={{
                backgroundColor: paperTheme.colors.surface,
                alignItems: "flex-start",
                marginBottom: 10,
              }}
            >
              <Card.Actions>
                <Button onPress={openBarcodeScanner}>Scan a Barcode</Button>
              </Card.Actions>
            </Card>
            {/* <TouchableOpacity
              style={styles.modalButton}
              onPress={openBarcodeScanner}
            >
              <Text style={styles.modalButtonText}>Open Barcode Scanner</Text>
            </TouchableOpacity> */}
            {/* Display Food Search Results */}
            {/* {console.log("FlatList Data:", prettyFormat(searchResults))} */}
            <FlatList
              styles={styles.flatlist}
              data={searchResults}
              keyExtractor={(item) => item.food.foodId}
              renderItem={({ item }) => (
                <TouchableOpacity
                  //onPress={handleOpenFoodNutrientModal}
                  style={styles.foodItemContainer}
                >
                  <View style={styles.foodInfoContainer}>
                    <Text style={styles.foodLabel}>{item.food.label}</Text>
                    <Text style={styles.foodLabelCalories}>
                      Calories: {Math.round(item.food.nutrients.ENERC_KCAL)}
                    </Text>
                    <Text style={styles.foodLabelServingSize}>
                      Serving Size:
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => handleSelectFood(item)}
                  >
                    {/* <Text style={{ color: paperTheme.colors.text }}>
                      Select
                    </Text> */}
                    <Feather
                      name="plus-circle"
                      color={paperTheme.colors.text}
                      size={24}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Barcode Scanner Modal */}
          {isBarcodeScannerVisible && (
            <View style={styles.barcodeScannerContainer}>
              <BarcodeScanner
                onBarcodeScanned={handleBarcodeScanned}
                onClose={closeBarcodeScanner}
              />
            </View>
          )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FoodEntryModal;
