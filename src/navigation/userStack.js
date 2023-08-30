import React from "react";
import { Modal, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import HomeScreen from "../screens/Home";
import SettingsScreen from "../screens/Settings";
import FoodlogScreen from "../screens/Foodlog.js";

const Tab = createBottomTabNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#0e1529",
            height: "10%",
            paddingBottom: 5,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            fontSize: 16,
            marginTop: 5,
          },
        }}
        sceneContainerStyle={{ backgroundColor: "#0e1529" }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarShowLabel: true,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="home"
                color={focused ? "white" : "gray"}
                size={35}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Foodlog"
          component={FoodlogScreen}
          options={{
            tabBarShowLabel: true,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="coffee"
                color={focused ? "white" : "gray"}
                size={35}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}
          options={{
            tabBarShowLabel: true,
            tabBarIcon: () => <SettingsScreen />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
