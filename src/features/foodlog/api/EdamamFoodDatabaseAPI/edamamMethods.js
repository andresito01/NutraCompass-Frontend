import apiKeys from "./keys.js";

const API_ID = apiKeys.edamamConfig.app_id;
const API_KEY = apiKeys.edamamConfig.app_key;
const BASE_URL = "https://api.edamam.com/api/food-database/v2/parser";

// Query Edamam Food Database API for foods according to user search values
export async function searchFood(searchTerm) {
  const url = `${BASE_URL}?ingr=${searchTerm}&app_id=${API_ID}&app_key=${API_KEY}`;

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

export async function searchFoodByBarcode(code) {
  const url = `${BASE_URL}?upc=${code}&app_id=${API_ID}&app_key=${API_KEY}`;

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
