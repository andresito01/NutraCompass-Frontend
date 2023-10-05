import React from "react";
import { Text, View, Pressable } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";
import { loggingOut } from "../api/FirebaseAPI/firebaseMethods.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import settingsScreenStyles from "./styles/settingsScreenStyles.js";
import { useThemeContext } from "../context/ThemeContext.js";
import { useNavigation } from "@react-navigation/native";

function SettingsScreen() {
  const navigation = useNavigation();
  const styles = settingsScreenStyles();
  const paperTheme = useTheme();
  // Access the toggleTheme function using useContext
  const { toggleTheme } = useThemeContext();

  const handleLogout = () => {
    loggingOut();
  };

  return (
    <View style={styles.container}>
      {/* Customize Goals  */}
      <Pressable
        onPress={() => navigation.navigate("Goals")}
        style={[styles.row, paperTheme.shadows.small]}
      >
        <Feather name="target" color={paperTheme.colors.text} size={30} />

        <Text style={styles.text}>Goals</Text>
        <Feather
          style={{ position: "absolute", right: 10 }}
          name="arrow-right"
          color={paperTheme.colors.text}
          size={24}
        />
      </Pressable>

      {/* Switch theme between light and dark mode */}
      <Pressable
        onPress={toggleTheme}
        style={[styles.row, paperTheme.shadows.small]}
      >
        <FontAwesome
          name={paperTheme.dark ? "moon-o" : "sun-o"}
          size={30}
          color={paperTheme.colors.text}
        />

        <Text style={styles.text}>
          Switch To {paperTheme.dark ? "Light" : "Dark"} Mode
        </Text>
      </Pressable>

      {/* Logout */}
      <Pressable
        onPress={handleLogout}
        style={[styles.row, paperTheme.shadows.small]}
      >
        <Feather name="log-out" color={paperTheme.colors.text} size={30} />

        <Text style={styles.text}>Logout</Text>
      </Pressable>
    </View>
  );
}

export default SettingsScreen;
