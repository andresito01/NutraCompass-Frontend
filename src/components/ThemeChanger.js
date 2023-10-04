import React from "react";
import { TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useThemeContext } from "../context/ThemeContext.js";

function ThemeChanger() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <TouchableOpacity
      style={{ position: "absolute", top: 20, right: 20, zIndex: 100 }}
      onPress={toggleTheme}
    >
      <FontAwesome
        name={theme.dark ? "moon-o" : "sun-o"}
        size={30}
        color={theme.colors.text} // Use theme text color
      />
    </TouchableOpacity>
  );
}

export default ThemeChanger;
