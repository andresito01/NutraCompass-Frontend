import "./src/config/firebase.js";
import React from "react";
import RootNavigation from "./src/navigation/index.js";
import { ThemeProvider } from "./src/context/ThemeContext.js";

export default function App() {
  return (
    <ThemeProvider>
      {/* Root Navigation */}
      <RootNavigation />
    </ThemeProvider>
  );
}
