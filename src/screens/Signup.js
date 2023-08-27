import React from "react";
import logo from "../../assets/brandmark-design.png";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
// Firebase API method imports
import { registration } from "../api/FirebaseAPI/firebaseMethods.js";

function SignUpScreen({ navigation }) {
  const [show, setShow] = React.useState(false);
  const [value, setValue] = React.useState({
    firstName: "",
    lastName: "",
    dob: new Date(),
    email: "",
    password: "",
    error: "",
  });

  const emptyState = () => {
    setValue({
      firstName: "",
      lastName: "",
      dob: new Date(),
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
      registration(
        value.firstName,
        value.lastName,
        value.dob,
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
    if (show === false) {
      setShow(true);
    } else if (show === true) {
      setShow(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#141e30", "#243b55"]}
          style={styles.gradientContainer}
        >
          <View style={styles.contentContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>Sign Up</Text>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Welcome")}
            >
              Go to Welcome Screen
            </Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="First Name"
                  value={value.firstName}
                  style={styles.input}
                  onChangeText={(text) =>
                    setValue({ ...value, firstName: text })
                  }
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  placeholder="Last Name"
                  value={value.lastName}
                  style={styles.input}
                  onChangeText={(text) =>
                    setValue({ ...value, lastName: text })
                  }
                  autoCapitalize="none"
                />
              </View>
              <Pressable onPress={showDatePicker}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                    margin: 5,
                  }}
                >
                  Select Date of Birth
                </Text>
              </Pressable>
              <View style={styles.inputWrapper}>
                {show && (
                  <DateTimePicker
                    value={value.dob}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                  />
                )}
              </View>
              <View style={styles.inputWrapper}>
                <Icon style={styles.icon} name="email" size={18} color="gray" />
                <TextInput
                  placeholder="Email"
                  value={value.email}
                  style={styles.input}
                  onChangeText={(text) => setValue({ ...value, email: text })}
                  autoCapitalize="none"
                  secureTextEntry={false}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Icon style={styles.icon} name="lock" size={18} color="gray" />
                <TextInput
                  placeholder="Password"
                  style={styles.input}
                  onChangeText={(text) =>
                    setValue({ ...value, password: text })
                  }
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
              </View>
            </View>
            <Pressable style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
            <Text style={styles.signupText}>
              Have an account?{" "}
              <Text
                style={styles.signupLink}
                onPress={() => navigation.navigate("Sign In")}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
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
  logo: {
    width: 360,
    height: 100,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 16,
  },
  link: {
    color: "blue",
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "#3498db",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  signupText: {
    color: "white",
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
  signupLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default SignUpScreen;
