import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useTheme } from "react-native-paper"; // Import useTheme from react-native-paper
import mealSectionCustomizationModalStyles from "./styles/mealSectionCustomizationModalStyles.js";
import Feather from "react-native-vector-icons/Feather";

const MealSectionCustomizationModal = ({
  isVisible,
  onCancel,
  onSaveCustomizations,
}) => {
  const styles = mealSectionCustomizationModalStyles();
  const paperTheme = useTheme(); // Get the current theme

  const [mealSections, setMealSections] = useState([
    // Initialize with default meal sections
    { name: "Meal 1", order: 1 },
    { name: "Meal 2", order: 2 },
    { name: "Meal 3", order: 3 },
  ]);

  const [newMealSection, setNewMealSection] = useState({
    name: "",
    order: "",
  });

  const handleCloseModal = () => {
    onCancel(); // Close the modal
  };

  const handleSaveCustomizations = () => {
    onSaveCustomizations(mealSections); // Pass the customizations back to the parent component
    handleCloseModal();
  };

  // Helper function to update the meal section name
  const updateMealSectionName = (index, newName) => {
    const updatedSections = [...mealSections];
    updatedSections[index].name = newName;
    setMealSections(updatedSections);
  };

  const deleteMealSection = (index) => {
    const updatedSections = [...mealSections];
    if (updatedSections[index]) {
      const deletedOrder = updatedSections[index].order;
      updatedSections.splice(index, 1);

      // Update orders of sections after deletion
      updatedSections.forEach((section) => {
        if (section.order > deletedOrder) {
          section.order -= 1;
        }
      });

      setMealSections(updatedSections);
    }
  };

  const addNewMealSection = () => {
    if (newMealSection.name) {
      const updatedSections = [...mealSections];

      if (newMealSection.order) {
        const order = parseInt(newMealSection.order);

        if (order > 0 && order <= mealSections.length + 1) {
          // Shift existing sections to make room for the new section
          updatedSections.forEach((section) => {
            if (section.order >= order) {
              section.order += 1;
            }
          });

          updatedSections.splice(order - 1, 0, {
            name: newMealSection.name,
            order: order,
          });
        } else {
          // Invalid order, add the new section at the end
          updatedSections.push({
            name: newMealSection.name,
            order: mealSections.length + 1,
          });
        }
      } else {
        // No order specified, add the new section at the end
        updatedSections.push({
          name: newMealSection.name,
          order: mealSections.length + 1,
        });
      }

      setMealSections(updatedSections);
      setNewMealSection({ name: "", order: "" });
    }
  };

  const renderMealSectionItem = ({ item, drag, isActive }) => (
    <TouchableWithoutFeedback disabled={isActive}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={styles.deleteSectionButton}
          onPress={() => deleteMealSection(item.order - 1)}
        >
          <Feather name="trash-2" color={paperTheme.colors.accent} size={18} />
        </TouchableOpacity>
        <View
          style={{
            ...styles.sectionRow,
            backgroundColor: isActive
              ? paperTheme.colors.primary
              : paperTheme.colors.surface,
          }}
        >
          <Text style={styles.sectionOrder}>{item.order}</Text>
          <TextInput
            style={styles.sectionInput}
            value={item.name}
            onChangeText={(newName) =>
              updateMealSectionName(item.order - 1, newName)
            }
          />
          <TouchableOpacity style={styles.sectionMoveToggle} onLongPress={drag}>
            <Feather
              name="align-justify"
              color={paperTheme.colors.text}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <Modal
      style={{ flex: 1 }}
      visible={isVisible}
      animationType="slide"
      transparent={true}
    >
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalButtonHeader}>
              <TouchableOpacity
                // style={{ position: "absolute", top: 5, left: 5, padding: 5 }}
                onPress={handleCloseModal}
              >
                <Feather
                  name="arrow-left"
                  color={paperTheme.colors.text}
                  size={26}
                />
              </TouchableOpacity>
              <TouchableOpacity
                // style={{ position: "absolute", top: 5, right: 5, padding: 5 }}
                onPress={handleSaveCustomizations}
              >
                <Feather
                  name="check-circle"
                  color={paperTheme.colors.primary}
                  size={26}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>Customize Meal Sections</Text>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Create A New Meal</Text>
              <View style={styles.formFieldContainer}>
                <TextInput
                  style={[styles.formOrderInput]}
                  placeholder="Order #"
                  placeholderTextColor={paperTheme.colors.text}
                  value={newMealSection.order}
                  onChangeText={(text) =>
                    setNewMealSection({ ...newMealSection, order: text })
                  }
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.formMealInput}
                  placeholder="Meal Name"
                  placeholderTextColor={paperTheme.colors.text}
                  value={newMealSection.name}
                  onChangeText={(text) =>
                    setNewMealSection({ ...newMealSection, name: text })
                  }
                />
                <TouchableOpacity
                  style={styles.addMealSectionButton}
                  onPress={addNewMealSection}
                >
                  <Feather
                    name="plus-circle"
                    color={paperTheme.colors.primary}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <DraggableFlatList
                data={mealSections}
                renderItem={renderMealSectionItem}
                keyExtractor={(item) => item.order.toString()}
                onDragEnd={({ data }) => setMealSections(data)}
                contentContainerStyle={{ flexGrow: 1 }}
              />
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MealSectionCustomizationModal;
