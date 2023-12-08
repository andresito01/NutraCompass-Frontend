import React from "react";
import logo from "../../assets/brandmark-design.png";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Image,
  Text,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// Firebase API method imports
import { useTheme, TextInput, Button } from "react-native-paper";
import signinScreenStyles from "./styles/signinScreenStyles.js";
import { signIn } from "../authentication/api/FirebaseAPI/authenticationMethods.js";
import ThemeChanger from "../components/ThemeChanger.js";

function SignInScreen({ navigation }) {
  const styles = signinScreenStyles(); // Use the imported styles
  const paperTheme = useTheme();

  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  const emptyState = () => {
    setValue({
      email: "",
      password: "",
      error: "",
    });
  };

  const handleSignIn = () => {
    // Sign in form validation
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      Alert.alert("Email and password are mandatory.");
      return;
    } else {
      signIn(value.email, value.password);
      emptyState();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ThemeChanger />
        <LinearGradient
          colors={[
            paperTheme.colors.gradientStart,
            paperTheme.colors.gradientEnd,
          ]}
          locations={[0.5, 1]} // Control the position of the gradient colors
          style={styles.gradientContainer}
        >
          <View style={styles.contentContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>Sign In</Text>
            <View style={styles.inputContainer}>
              <TextInput
                label="Email"
                value={value.email}
                style={styles.input}
                onChangeText={(text) => setValue({ ...value, email: text })}
                autoCapitalize="none"
                textColor="black"
              />
              <TextInput
                label="Password"
                value={value.password}
                style={styles.input}
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={true}
                autoCapitalize="none"
                textColor="black"
              />
            </View>
            <Button
              mode="contained"
              style={styles.button}
              labelStyle={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
              }}
              onPress={handleSignIn}
            >
              Sign In
            </Button>
            <Text style={styles.signupText}>
              Don't Have an account?{" "}
              <Text
                style={styles.signupLink}
                onPress={() => navigation.navigate("Sign Up")}
              >
                Sign Up
              </Text>
            </Text>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Welcome")}
            >
              Go to Welcome Screen
            </Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SignInScreen;
