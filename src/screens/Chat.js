import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import { useAuth } from "../context/AuthContext.js";
import { useTheme } from "react-native-paper"; // Import useTheme from react-native-paper
import chatScreenStyles from "./styles/chatScreenStyles.js";

export default function ChatScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const paperTheme = useTheme(); // Get the theme
  const styles = chatScreenStyles(); // Apply your styles

  const navigateToGym = () => {
    navigation.navigate("Gym");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navigateToGymButton}
        onPress={navigateToGym}
      >
        <Feather name="arrow-left" color={paperTheme.colors.text} size={28} />
      </TouchableOpacity>
      <Text style={styles.text}>Gym Community Chat</Text>
    </View>
  );
}
