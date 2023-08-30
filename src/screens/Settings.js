import React from "react";
import { Modal, TouchableOpacity, Text, Pressable, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
// Firebase API method imports
import { loggingOut } from "../api/FirebaseAPI/firebaseMethods.js";

function Settings() {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleLogout = () => {
    loggingOut();
  };
  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <Feather name="menu" color="gray" size={35} />
      </Pressable>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <View className="h-[30%] mt-auto border rounded-t-3xl ">
            <LinearGradient
              colors={["#141e30", "#243b55"]}
              style={{ flex: 1, borderRadius: 20 }}
            >
              <Pressable onPress={handleLogout}>
                <View className="flex flex-row m-4">
                  <Feather name="log-out" color="white" size={30} />
                  <Text className="text-white text-xl">Logout</Text>
                </View>
              </Pressable>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default Settings;
