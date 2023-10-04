import React from "react";
import { useAuth } from "../hooks/useAuth";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { SafeAreaView } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { useThemeContext } from "../context/ThemeContext.js";

export default function RootNavigation() {
  const { user } = useAuth();
  const { theme } = useThemeContext();
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView
        style={{
          flex: "1",
          backgroundColor: theme.colors.background, // Set the background color
        }}
      >
        {user ? <UserStack /> : <AuthStack />}
      </SafeAreaView>
    </PaperProvider>
  );
}
