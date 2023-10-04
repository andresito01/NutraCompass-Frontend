import React, { createContext, useContext, useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { CustomDefaultTheme, CustomDarkTheme } from "../../themes.js";

// Create a theme context
export const ThemeContext = createContext();

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(CustomDefaultTheme); // State for theme

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme =
      theme === CustomDefaultTheme ? CustomDarkTheme : CustomDefaultTheme;
    console.log(newTheme === CustomDarkTheme);
    console.log(
      `Switching to ${newTheme === CustomDarkTheme ? "Dark" : "Light"} Theme`
    );
    setTheme(newTheme);
  };

  useEffect(() => {
    // Set the status bar text color based on the current theme
    StatusBar.setBarStyle(theme.dark ? "light-content" : "dark-content");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
