import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "./src/config/firebase.js";

import RootNavigation from "./src/navigation/index.js";

export default function App() {
  return <RootNavigation />;
}
