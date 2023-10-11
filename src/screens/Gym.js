import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper"; // Import useTheme from react-native-paper
import gymScreenStyles from "./styles/gymScreenStyles.js";

export default function GymScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const paperTheme = useTheme(); // Get the theme
  const styles = gymScreenStyles(); // Apply your styles

  const navigateToChat = () => {
    navigation.navigate("Chat");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navigateToChatButton}
        onPress={navigateToChat}
      >
        <Feather
          name="message-circle"
          color={paperTheme.colors.text}
          size={28}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Gym</Text>
    </View>
  );
}
