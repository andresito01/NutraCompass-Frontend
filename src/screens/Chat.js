import React from "react";
import { Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "react-native-paper"; // Import useTheme from react-native-paper
import chatScreenStyles from "./styles/chatScreenStyles.js";

export default function ChatScreen() {
  const { user } = useAuth();
  const paperTheme = useTheme(); // Get the theme
  const styles = chatScreenStyles(); // Apply your styles

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gym Community Chat</Text>
    </View>
  );
}
