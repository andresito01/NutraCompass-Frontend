import React, { useState, useEffect } from "react";
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
import { useTheme } from "react-native-paper";
import mealSectionCustomizationModalStyles from "./styles/mealSectionCustomizationModalStyles.js";
import Feather from "react-native-vector-icons/Feather";

const MealSectionCustomizationModal = ({
  isVisible,
  onCancel,
  onSaveCustomizations,
  mealSections,
  setMealSections,
  foodEntries,
  setFoodEntries,
}) => {
  const styles = mealSectionCustomizationModalStyles();
  const paperTheme = useTheme();

  const [newMealSection, setNewMealSection] = useState({ name: "", order: "" });

  const handleCloseModal = () => {
    onCancel();
  };

  const handleSaveCustomizations = () => {
    onSaveCustomizations(mealSections);
    handleCloseModal();
  };

  const updateMealSectionName = (sectionId, newName) => {
    const updatedSections = mealSections.map((section) => {
      if (section.id === sectionId) {
        return { ...section, name: newName };
      }
      return section;
    });
    setMealSections(updatedSections);
  };

  const handleDeleteMealSection = (sectionId) => {
    const updatedSections = mealSections
      .filter((section) => section.id !== sectionId)
      .map((section, index) => ({
        ...section,
        order: index + 1,
      }));
    setMealSections(updatedSections);

    // Delete the entries for the removed section
    const updatedEntries = { ...foodEntries };
    delete updatedEntries[sectionId];
    setFoodEntries(updatedEntries);
  };

  const handleAddNewMealSection = () => {
    if (newMealSection.name) {
      if (mealSections.length === 0) {
        // If there are no existing sections, set the order to 1
        newMealSection.order = 1;
      } else {
        // Find the highest order number in existing sections
        const maxOrder = Math.max(
          ...mealSections.map((section) => section.order)
        );
        // Set the new section's order to one greater than the max
        newMealSection.order = maxOrder + 1;
      }

      const newSection = {
        id: `custom_${Date.now()}`,
        name: newMealSection.name,
        order: newMealSection.order,
      };

      const updatedSections = [...mealSections, newSection];
      setMealSections(updatedSections);

      // Initialize the entries for the new section as an empty array
      setFoodEntries({
        ...foodEntries,
        [newSection.id]: [],
      });

      setNewMealSection({ name: "", order: "" });
    }
  };

  useEffect(() => {
    console.log(mealSections);
  }, [mealSections]);

  const renderMealSectionItem = ({ item, drag, isActive }) => {
    const [isEditing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState(item.name);

    const handleNameClick = () => {
      if (!isEditing) {
        setEditing(true);
      }
    };

    const handleNameChange = (newName) => {
      setEditedName(newName);
    };

    const handleNameBlur = () => {
      setEditing(false);
      if (editedName !== item.name) {
        // Save the updated name when blurred
        updateMealSectionName(item.id, editedName);
      }
    };

    return (
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
            onPress={() => handleDeleteMealSection(item.id)}
          >
            <Feather
              name="trash-2"
              color={paperTheme.colors.accent}
              size={18}
            />
          </TouchableOpacity>
          <View
            style={{
              ...styles.sectionRow,
              backgroundColor: isActive
                ? paperTheme.colors.primary
                : paperTheme.colors.surface,
            }}
          >
            <Text style={styles.sectionOrder} onPress={handleNameClick}>
              {item.order}
            </Text>
            {isEditing ? (
              <TextInput
                style={styles.sectionInput}
                value={editedName}
                onChangeText={handleNameChange}
                onBlur={handleNameBlur}
                autoFocus
              />
            ) : (
              <Text style={styles.sectionInput} onPress={handleNameClick}>
                {editedName}
              </Text>
            )}
            <TouchableOpacity
              style={styles.sectionMoveToggle}
              onLongPress={drag}
              delayLongPress={100}
            >
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
  };

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
              <TouchableOpacity onPress={handleCloseModal}>
                <Feather
                  name="arrow-left"
                  color={paperTheme.colors.text}
                  size={26}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveCustomizations}>
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
                  onPress={handleAddNewMealSection}
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
                keyExtractor={(item) => item.id}
                onDragEnd={({ data, from, to }) => {
                  // Calculate the new order positions for all items
                  const updatedSections = data.map((item, index) => ({
                    ...item,
                    order: index + 1,
                  }));

                  // Sort the sections based on the updated order
                  updatedSections.sort((a, b) => a.order - b.order);

                  // Update the mealSections state with the updated order positions
                  setMealSections(updatedSections);
                }}
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
