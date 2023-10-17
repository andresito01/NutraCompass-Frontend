import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper"; // Import useTheme from react-native-paper
import goalsScreenStyles from "./styles/goalsScreenStyles.js";
const GoalsScreen = () => {
  const navigation = useNavigation();
  const paperTheme = useTheme(); // Get the theme
  const styles = goalsScreenStyles();

  const [dailyCaloriesGoal, setDailyCaloriesGoal] = useState(""); // Initialize state

  const navigateToMore = () => {
    navigation.navigate("More");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.navigateToMoreButton}
          onPress={navigateToMore}
        >
          <Feather name="arrow-left" color={paperTheme.colors.text} size={28} />
        </TouchableOpacity>
      </View>
      <Pressable style={styles.row}>
        <Text style={styles.text}>Starting Weight</Text>
      </Pressable>
      <Pressable style={styles.row}>
        <Text style={styles.text}>Current Weight</Text>
      </Pressable>
      <Pressable style={styles.row}>
        <Text style={styles.text}>Goal Weight</Text>
      </Pressable>
      <Pressable style={styles.row}>
        <Text style={styles.text}>Weekly Goal</Text>
      </Pressable>
      <Pressable style={styles.row}>
        <Text style={styles.text}>Activity Level</Text>
      </Pressable>
      <Pressable style={styles.row}>
        <Text style={styles.text}>Calories</Text>
        <TextInput
          style={styles.input}
          value={dailyCaloriesGoal}
          onChangeText={(text) => setDailyCaloriesGoal(text)}
          keyboardType="numeric"
        />
      </Pressable>
    </View>
  );
};

export default GoalsScreen;
