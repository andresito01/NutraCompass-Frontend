import React, { useState, useEffect } from "react";
import { ScrollView, UIManager, LayoutAnimation } from "react-native";
import SwipeableFoodEntryItem from "./SwipeableFoodEntryItem.js";

const FoodEntryList = ({ foodEntryItems, setFoodEntryItems, mealType }) => {
  //console.log(foodEntryItems);
  const [isSwiping, setIsSwiping] = useState(false);

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
    LayoutAnimation.spring();
  }, []);

  const handleDeleteEntry = (id) => {
    // const updatedFoodEntryItems = foodEntryItems.filter(
    //   (item) => item.id !== id
    // );
    const updatedFoodEntryItems = [...foodEntryItems];
    updatedFoodEntryItems.splice(id, 1);
    setFoodEntryItems(updatedFoodEntryItems);
  };

  const handleEdit = (itemId) => {
    // Implement the edit functionality here
    console.log("Edit button pressed for item with ID:", itemId);
  };

  const renderItems = () => {
    return foodEntryItems.map((item, index) => {
      return (
        <SwipeableFoodEntryItem
          key={index}
          swipingCheck={(swiping) => setIsSwiping(swiping)}
          id={index}
          itemData={item}
          handleDeleteEntry={(id) => handleDeleteEntry(id)}
          deleteButtonPressed={() =>
            console.log("delete button pressed for id:", index)
          }
          editButtonPressed={() => handleEdit(index)} // Call a function with the item ID when the Edit button is pressed
        />
      );
    });
  };

  return <ScrollView scrollEnabled={!isSwiping}>{renderItems()}</ScrollView>;
};

export default FoodEntryList;
