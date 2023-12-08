import apiKeys from "./keys.js";

const API_ID = apiKeys.edamamConfig.app_id;
const API_KEY = apiKeys.edamamConfig.app_key;
const PARSER_BASE_URL = "https://api.edamam.com/api/food-database/v2/parser";
const NUTRIENTS_BASE_URL =
  "https://api.edamam.com/api/food-database/v2/nutrients";

// Search Edamam Food Database API for foods according to user search values
export async function searchFood(searchTerm) {
  const url = `${PARSER_BASE_URL}?ingr=${searchTerm}&app_id=${API_ID}&app_key=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
    // Process the data as needed, e.g., display the food items
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Search Edamam Food Database API for a specific food item through its barcode
export async function searchFoodByBarcode(code) {
  const url = `${PARSER_BASE_URL}?upc=${code}&app_id=${API_ID}&app_key=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
    // Process the data as needed, e.g., display the food items
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

/**
 * ingredients param object format
{
  "ingredients": [
    {
      "quantity": 0,
      "measureURI": "string",
      "qualifiers": [
        "string"
      ],
      "foodId": "string"
    }
  ]
}
 */

// const ingredientsObject = {
//   ingredients: [
//     {
//       quantity: 1,
//       measureURI: selectedFood.measures[0].uri,
//       foodId: selectedFood.food.foodId,
//     },
//   ],
// };

// try {
//   const foodNutrientsSearchResults = await searchForFoodItemNutrients(
//     ingredientsObject
//   );
//   console.log("Selected Food Nutrients: \n", foodNutrientsSearchResults);
// } catch (error) {
//   console.log("Error process selected food nutrients.", error);
// }

// Get a food item's nutrient information
export async function searchForFoodItemNutrients(ingredients) {
  const url = `${NUTRIENTS_BASE_URL}?ingredients=${ingredients}&app_id=${API_ID}&app_key=${API_KEY}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
    // Process the data as needed, e.g., display the food items
  } catch (error) {
    console.error(
      "There was a problem with the fetch operation:",
      error.status
    );
  }
}
