import React, { useContext } from "react";
import { Text, View, Pressable } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";
import { loggingOut } from "../api/FirebaseAPI/firebaseMethods.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import settingsScreenStyles from "./styles/settingsScreenStyles.js";
import { useThemeContext } from "../context/ThemeContext.js";

function SettingsScreen() {
  const styles = settingsScreenStyles();
  const paperTheme = useTheme();
  // Access the toggleTheme function using useContext
  const { toggleTheme } = useThemeContext();

  const handleLogout = () => {
    loggingOut();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.row, paperTheme.shadows.small]}>
        <Pressable style={{ padding: 10 }} onPress={handleLogout}>
          <Feather name="log-out" color={paperTheme.colors.text} size={30} />
        </Pressable>
        <Text style={[styles.text, { color: paperTheme.colors.text }]}>
          Logout
        </Text>
      </View>

      <View style={[styles.row, paperTheme.shadows.small]}>
        <Pressable style={{ padding: 10 }} onPress={toggleTheme}>
          <FontAwesome
            name={paperTheme.dark ? "moon-o" : "sun-o"}
            size={30}
            color={paperTheme.colors.text}
          />
        </Pressable>
        <Text style={[styles.text, { color: paperTheme.colors.text }]}>
          Switch To {paperTheme.dark ? "Light" : "Dark"} Mode
        </Text>
      </View>
    </View>
  );
}

export default SettingsScreen;
