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
import { useFoodLog } from "../context/FoodLogContext.js";
import { useTheme } from "react-native-paper";
import mealSectionCustomizationModalStyles from "./styles/mealSectionCustomizationModalStyles.js";
import Feather from "react-native-vector-icons/Feather";

const MealSectionCustomizationModal = ({ isVisible, closeModal }) => {
  const styles = mealSectionCustomizationModalStyles();
  const paperTheme = useTheme();
  const {
    mealSections,
    setMealSections,
    loadMealSectionCustomizations,
    updateMealSectionNames,
  } = useFoodLog();

  const [localMealSections, setLocalMealSections] = useState([...mealSections]);
  const [tempMealSections, setTempMealSections] = useState([...mealSections]);
  const [editingStates, setEditingStates] = useState(
    localMealSections.map(() => false)
  );

  console.log("Is Visible: " + isVisible);
  useEffect(() => {
    console.log("Meal Customization Modal Effect executed");

    // Load meal section customizations when the modal opens
    if (isVisible) {
      loadMealSectionCustomizations();
      setLocalMealSections([...mealSections]);
      setTempMealSections([...mealSections]);
      setEditingStates(localMealSections.map(() => false));
    }
  }, [isVisible]);

  const handleCloseModal = () => {
    setTempMealSections([...localMealSections]); // Reset temp state to local state
    closeModal();
  };

  const updateTempMealName = (mealId, newName) => {
    const updatedSections = tempMealSections.map((section) => {
      if (section.id === mealId) {
        return { ...section, name: newName };
      }
      return section;
    });
    setTempMealSections(updatedSections);
  };

  const handleSaveCustomizations = async () => {
    // Create an array of objects with updates
    const mealSectionUpdates = localMealSections.map((section, index) => ({
      mealSectionId: section.id,
      newName: tempMealSections[index].name,
    }));

    // Update the global mealSections state in FoodLogContext
    updateMealSectionNames(mealSectionUpdates);

    // Close the modal
    handleCloseModal();
  };

  const renderMealSectionItems = () => {
    return localMealSections.map((item, index) => {
      const isEditing = editingStates[index];
      const editedName = tempMealSections[index].name;

      const handleNameClick = () => {
        const newEditingStates = [...editingStates];
        newEditingStates[index] = true;
        setEditingStates(newEditingStates);
      };

      const handleNameChange = (newName) => {
        // Update the name in the temporary state
        const updatedSections = [...tempMealSections];
        updatedSections[index] = { ...item, name: newName };
        setTempMealSections(updatedSections);
      };

      const handleNameBlur = () => {
        const newEditingStates = [...editingStates];
        newEditingStates[index] = false;
        setEditingStates(newEditingStates);

        if (editedName !== item.name) {
          // Save the updated name locally
          updateTempMealName(item.id, editedName);
        }
      };

      const isPlaceholder = item.name === "";

      return (
        <TouchableWithoutFeedback key={item.id}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                ...styles.sectionRow,
                backgroundColor: paperTheme.colors.surface,
              }}
            >
              <Text
                style={[
                  { flex: 1, textAlign: "left" },
                  isPlaceholder && styles.sectionIdTextNoValue,
                  !isPlaceholder && styles.sectionIdText,
                  isEditing && { color: paperTheme.colors.text },
                ]}
                onPress={handleNameClick}
              >
                {item.id}
              </Text>
              {isEditing ? (
                <TextInput
                  style={styles.sectionInputText}
                  value={editedName}
                  placeholder="New Meal"
                  placeholderTextColor={"rgba(169, 169, 169, 0.8)"}
                  onChangeText={handleNameChange}
                  onBlur={handleNameBlur}
                  autoFocus
                />
              ) : (
                <Text
                  style={[
                    isPlaceholder && styles.sectionInputTextNoValue,
                    !isPlaceholder && styles.sectionInputText,
                  ]}
                  onPress={handleNameClick}
                >
                  {editedName || (isPlaceholder && "New Meal")}
                </Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    });
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
            <Text style={styles.modalTitle}>Customize Meal Names</Text>
            {renderMealSectionItems()}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MealSectionCustomizationModal;
