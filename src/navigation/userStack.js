import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
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
//const GymStack = createStackNavigator();
const GymTopTab = createMaterialTopTabNavigator();

function UserStack() {
  const paperTheme = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => {
            let iconName;

            if (route.name === "AppGym") {
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
        <Tab.Screen name="AppGym" options={{ tabBarLabel: "Home" }}>
          {() => (
            <GymTopTab.Navigator
              screenOptions={{
                swipeEnabled: true,
                tabBarShowIcon: false,
                tabBarStyle: {
                  display: "none",
                },
              }}
            >
              <GymTopTab.Screen
                name="Gym"
                component={GymScreen}
                // options={({ navigation }) => ({
                //   headerRight: () => (
                //     <TouchableOpacity
                //       onPress={() => navigation.navigate("Chat")}
                //       style={{ marginRight: 20 }}
                //     >
                //       <Feather
                //         name="message-circle"
                //         size={25}
                //         color={paperTheme.colors.text}
                //       />
                //     </TouchableOpacity>
                //   ),
                //   // gestureDirection: "horizontal-inverted", // Allow swipe to Chat from Gym
                //   headerTitleStyle: {
                //     color: paperTheme.colors.text,
                //     fontSize: 20,
                //   },
                //   headerStyle: {
                //     backgroundColor: paperTheme.colors.background,
                //   },
                //   headerTintColor: paperTheme.colors.text,
                // })}
              />
              <GymTopTab.Screen
                name="Chat"
                component={ChatScreen}
                // options={({ navigation }) => ({
                //   headerLeft: () => (
                //     <TouchableOpacity
                //       onPress={() => navigation.navigate("Gym")}
                //       style={{ marginLeft: 20 }}
                //     >
                //       <Feather
                //         name="arrow-left"
                //         size={25}
                //         color={paperTheme.colors.text}
                //       />
                //     </TouchableOpacity>
                //   ),
                //   // gestureDirection: "horizontal", // Allow swipe back from Chat to Gym
                //   headerTitleStyle: {
                //     color: paperTheme.colors.text,
                //     fontSize: 20,
                //   },
                //   headerStyle: {
                //     backgroundColor: paperTheme.colors.background,
                //   },
                //   headerTintColor: paperTheme.colors.text,
                //   headerBackTitleVisible: false,
                // })}
              />
            </GymTopTab.Navigator>
          )}
        </Tab.Screen>

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
