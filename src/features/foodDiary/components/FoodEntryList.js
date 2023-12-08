import React, { useState, useEffect } from "react";
import { ScrollView, UIManager, LayoutAnimation } from "react-native";
import SwipeableFoodEntryItem from "./SwipeableFoodEntryItem.js";
import { useFoodLog } from "../context/FoodLogContext.js";

const FoodEntryList = ({
  foodEntryItems,
  mealType,
  handleOpenFoodNutrientModal,
}) => {
  const { deleteFoodEntry } = useFoodLog();

  //console.log(foodEntryItems);
  const [isSwiping, setIsSwiping] = useState(false);

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
    LayoutAnimation.spring();
  }, []);

  const handleDeleteEntry = (id) => {
    deleteFoodEntry(mealType, id);
  };

  const handleEdit = (id) => {
    handleOpenFoodNutrientModal();
  };

  const renderItems = () => {
    if (foodEntryItems) {
      return foodEntryItems.map((item, index) => {
        return (
          <SwipeableFoodEntryItem
            key={index}
            swipingCheck={(swiping) => setIsSwiping(swiping)}
            id={item.id}
            itemData={item}
            handleDeleteEntry={(id) => handleDeleteEntry(id)}
            deleteButtonPressed={(id) =>
              console.log("delete button pressed for id:", id)
            }
            editButtonPressed={(id) => handleEdit(id)} // Call a function with the item ID when the Edit button is pressed
          />
        );
      });
    }
  };

  return <ScrollView scrollEnabled={!isSwiping}>{renderItems()}</ScrollView>;
};

export default FoodEntryList;
