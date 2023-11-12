import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useAuth } from "../context/AuthContext.js";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { SafeAreaView, Platform, StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { useThemeContext } from "../context/ThemeContext.js";
import { FoodLogProvider } from "../features/foodlog/context/FoodLogContext.js";
export default function RootNavigation() {
  const { user } = useAuth();
  const [authResolved, setAuthResolved] = useState(false);
  const { theme } = useThemeContext();

  useEffect(() => {
    if (user !== undefined) {
      setAuthResolved(true);
    }
  }, [user]);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background, // Set the background color
          paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        }}
      >
        {authResolved ? (
          user ? (
            <FoodLogProvider>
              <UserStack />
            </FoodLogProvider>
          ) : (
            <AuthStack />
          )
        ) : (
          <Text>Loading ...</Text>
        )}
      </SafeAreaView>
    </PaperProvider>
  );
}
