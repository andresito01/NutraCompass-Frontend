import "./src/config/firebase.js";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootNavigation from "./src/navigation/index.js";
import { ThemeProvider } from "./src/context/ThemeContext.js";
import { FoodLogProvider } from "./src/features/foodlog/context/FoodLogContext.js";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <FoodLogProvider>
          {/* Root Navigation */}
          <RootNavigation />
        </FoodLogProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
