import React from "react";
import { View, Text, Pressable } from "react-native";
import goalsScreenStyles from "./styles/goalsScreenStyles.js";
const GoalsScreen = () => {
  const styles = goalsScreenStyles();

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default GoalsScreen;
