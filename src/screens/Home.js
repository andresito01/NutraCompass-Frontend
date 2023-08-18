import React from "react";
import { Text, View, Pressable } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { getAuth, signOut } from "firebase/auth";
export default function HomeScreen() {
  const { user } = useAuth();
  const auth = getAuth();
  return (
    <View className="w-full h-full">
      <View className="mx-4 h-5/6 flex justify-center align-center space-y-6">
        <Text className="text-white text-center text-2xl">
          Welcome {user?.email}!
        </Text>
      </View>
    </View>
  );
}
