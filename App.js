import "./src/config/firebase.js";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/context/AuthContext.js";
import RootNavigation from "./src/navigation/index.js";
import { ThemeProvider } from "./src/context/ThemeContext.js";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider>
          {/* Root Navigation */}
          <RootNavigation />
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
