import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";
import SettingsScreen from "../screens/Settings.js";
import HomeScreen from "../screens/Home.js";
import FoodlogScreen from "../screens/Foodlog.js";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function UserStack() {
  const paperTheme = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "FoodLog") {
              iconName = "coffee";
            } else if (route.name === "Settings") {
              iconName = "settings";
            }

            // You can customize the icon colors based on the focused state
            const iconColor = focused ? paperTheme.colors.text : "gray";

            return <Feather name={iconName} color={iconColor} size={size} />;
          },
          tabBarActiveTintColor: paperTheme.colors.text,
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 16,
            marginTop: 5,
          },
          tabBarStyle: {
            backgroundColor: paperTheme.colors.background, // Use the primary color from your theme
            height: "10%",
            paddingBottom: 5,
            paddingTop: 5,
          },
          // Hide the header for specific screens
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarLabel: "Home" }}
        />
        <Tab.Screen
          name="FoodLog"
          component={FoodlogScreen}
          options={{ tabBarLabel: "Food Log" }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ tabBarLabel: "Settings" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default UserStack;
