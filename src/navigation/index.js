import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useAuth } from "../authentication/context/AuthContext.js";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { SafeAreaView, Platform, StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { useThemeContext } from "../context/ThemeContext.js";
import { FoodLogProvider } from "../features/foodDiary/context/FoodLogContext.js";
import { UserSettingsProvider } from "../features/userSettings/context/UserSettingsContext.js";

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
            <UserSettingsProvider>
              <FoodLogProvider>
                <UserStack />
              </FoodLogProvider>
            </UserSettingsProvider>
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
