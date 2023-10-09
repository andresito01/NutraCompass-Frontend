import "./src/config/firebase.js";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootNavigation from "./src/navigation/index.js";
import { ThemeProvider } from "./src/context/ThemeContext.js";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        {/* Root Navigation */}
        <RootNavigation />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
