import React, { useState, useEffect } from "react";
import { FAB, Portal, useTheme } from "react-native-paper";

const FoodlogFabGroupMenu = ({
  isFocused,
  openMealSectionCustomizationModal,
}) => {
  const paperTheme = useTheme();
  const [state, setState] = useState({ open: false }); // Set open to isFocused initially

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  useEffect(() => {
    // Close the FAB when leaving the FoodLog screen
    if (!isFocused) {
      setState({ open: false });
    }
  }, [isFocused]);

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible={isFocused} // Set to true only when the FoodLog screen is active
        icon={open ? "minus" : "plus"}
        actions={[
          {
            icon: "pencil",
            color: paperTheme.colors.primary,
            label: "Customize Meal Names",
            onPress: openMealSectionCustomizationModal,
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
        style={{ position: "absolute", bottom: "10%" }}
        fabStyle={{ height: 40, justifyContent: "center" }}
        variant="surface"
      />
    </Portal>
  );
};

export default FoodlogFabGroupMenu;
