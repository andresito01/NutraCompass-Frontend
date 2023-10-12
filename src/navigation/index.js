import React from "react";
import { useAuth } from "../hooks/useAuth";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { SafeAreaView, Platform, StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { useThemeContext } from "../context/ThemeContext.js";

export default function RootNavigation() {
  const { user } = useAuth();
  const { theme } = useThemeContext();
  console.log("Status Bar Height: ", StatusBar.currentHeight);
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background, // Set the background color
          paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        }}
      >
        {user ? <UserStack /> : <AuthStack />}
      </SafeAreaView>
    </PaperProvider>
  );
}
