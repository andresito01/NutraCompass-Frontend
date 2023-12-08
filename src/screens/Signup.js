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
import { useTheme, TextInput, Button } from "react-native-paper"; // Import TextInput and Button from React Native Paper
import ThemeChanger from "../components/ThemeChanger.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import signupScreenStyles from "./styles/signupScreenStyles.js";
// Firebase API method imports
import { registration } from "../authentication/api/FirebaseAPI/authenticationMethods.js";

function SignUpScreen({ navigation }) {
  const styles = signupScreenStyles(); // Use the imported styles
  const paperTheme = useTheme();
  const [show, setShow] = React.useState(false);
  // Removed dob: new Date(), from state
  const [value, setValue] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
  });

  const emptyState = () => {
    setValue({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      error: "",
    });
  };

  const handleSignUp = () => {
    // Sign up form validation
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      Alert.alert("Email and password are mandatory.");
    } else {
      // Removed value.dob from registration parameters
      registration(
        value.firstName,
        value.lastName,
        value.email,
        value.password
      );
      emptyState();
      setShow(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setValue({ ...value, dob: currentDate });
  };

  const showDatePicker = () => {
    setShow(!show);
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
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.inputContainer}>
              <TextInput
                label="First Name"
                value={value.firstName}
                style={styles.input}
                onChangeText={(text) => setValue({ ...value, firstName: text })}
                autoCapitalize="none"
                textColor="black"
              />
              <TextInput
                label="Last Name"
                value={value.lastName}
                style={styles.input}
                onChangeText={(text) => setValue({ ...value, lastName: text })}
                autoCapitalize="none"
                textColor="black"
              />
              {/* <Pressable onPress={showDatePicker}>
                <Text style={styles.datePickerText}>Select Date of Birth</Text>
              </Pressable>
              {show && (
                <DateTimePicker
                  value={value.dob}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                />
              )} */}
              <TextInput
                label="Email"
                value={value.email}
                style={styles.input}
                onChangeText={(text) => setValue({ ...value, email: text })}
                autoCapitalize="none"
                secureTextEntry={false}
                textColor="black"
              />
              <TextInput
                label="Password"
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
              labelStyle={{ color: "white", fontSize: 18, fontWeight: "bold" }} // Style the button text
              onPress={handleSignUp}
            >
              Sign Up
            </Button>
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

export default SignUpScreen;
