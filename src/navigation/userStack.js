import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";
import GymScreen from "../screens/Gym.js";
import DashboardScreen from "../screens/Dashboard.js";
import FoodDiaryScreen from "../screens/FoodDiary.js";
import ChatScreen from "../screens/Chat.js";
import SettingsScreen from "../screens/Settings.js";
import GoalsScreen from "../screens/Goals.js";

const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();

function UserStack() {
  const paperTheme = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => {
            let iconName;

            if (route.name === "Gym") {
              iconName = "home";
            } else if (route.name === "Dashboard") {
              iconName = "trello";
            } else if (route.name === "Diary") {
              iconName = "book-open";
            } else if (route.name === "Chat") {
              iconName = "message-square";
            } else if (route.name === "AppSettings") {
              iconName = "more-horizontal";
            }

            // You can customize the icon colors based on the focused state
            const iconColor = focused
              ? paperTheme.colors.bottomNavText
              : "rgba(0, 0, 0, 0.3)";

            return <Feather name={iconName} color={iconColor} size={size} />;
          },
          tabBarActiveTintColor: paperTheme.colors.bottomNavText,
          tabBarInactiveTintColor: "rgba(0, 0, 0, 0.3)",
          tabBarLabelStyle: {
            fontSize: 14,
            marginTop: 5,
          },
          tabBarStyle: {
            backgroundColor: paperTheme.colors.primary, // Use the primary color from your theme
            height: "9%",
            paddingBottom: 5,
            paddingTop: 5,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            borderTopColor: "transparent",
          },
          // Hide the header for specific screens
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Gym"
          component={GymScreen}
          options={{ tabBarLabel: "Gym" }}
        />
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ tabBarLabel: "Dashboard" }}
        />
        <Tab.Screen
          name="Diary"
          component={FoodDiaryScreen}
          options={{ tabBarLabel: "Diary" }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{ tabBarLabel: "Chat" }}
        />
        <Tab.Screen name="AppSettings" options={{ tabBarLabel: "More" }}>
          {() => (
            <SettingsStack.Navigator>
              <SettingsStack.Screen
                name="More"
                component={SettingsScreen}
                options={{
                  headerShown: true,
                  headerTitleStyle: {
                    color: paperTheme.colors.text,
                    fontSize: 20,
                  },
                  headerStyle: {
                    backgroundColor: paperTheme.colors.background,
                  },
                  headerTintColor: paperTheme.colors.text,
                }}
              />
              <SettingsStack.Screen
                name="Goals"
                component={GoalsScreen}
                options={{
                  headerShown: true,
                  headerTitleStyle: {
                    color: paperTheme.colors.text,
                    fontSize: 20,
                  },
                  headerStyle: {
                    backgroundColor: paperTheme.colors.background,
                  },
                  headerTintColor: paperTheme.colors.text,
                  headerBackTitleVisible: false,
                }}
              />
            </SettingsStack.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default UserStack;
