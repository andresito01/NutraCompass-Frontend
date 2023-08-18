import React from "react";
import { Text, Pressable, Image, View, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#141e30", "#243b55"]}
        style={styles.gradientContainer}
      >
        <View style={styles.contentContainer}>
          <View>
            {/* <Image source={require('../../assets/phone.png')} style={styles.image} /> */}
          </View>
          <Text style={styles.appName}>NutraCompass</Text>
          <Text style={styles.description}>
            Achieve your fitness and health goals with this all in one guide and
            application to manage and track various metrics.
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("Sign In")}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("Sign Up")}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
    borderRadius: 20,
  },
  contentContainer: {
    margin: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
    marginVertical: 16,
    textAlign: "center",
  },
  description: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WelcomeScreen;
