import React, { useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
  Easing,
} from "react-native";
import swipeableFoodEntryItemStyles from "./styles/swipeableFoodEntryItemStyles.js";

const SCREEN_WIDTH = Dimensions.get("window").width;
const RIGHT_BUTTON_THRESHOLD = SCREEN_WIDTH / 15;
const FORCE_TO_OPEN_THRESHOLD = SCREEN_WIDTH / 3.5;
const FORCING_DURATION = 350;
const SCROLL_THRESHOLD = SCREEN_WIDTH / 15;

const SwipeableFoodEntryItem = ({
  id,
  itemData,
  swipingCheck,
  deleteButtonPressed,
  editButtonPressed,
  handleDeleteEntry,
}) => {
  const styles = swipeableFoodEntryItemStyles(SCREEN_WIDTH); // Apply your styles
  // Use useRef to create independent Animated.Value instances for each item
  const position = useRef(new Animated.ValueXY(0, 0)).current;

  // Define getRightButtonProps function
  const getRightButtonProps = () => {
    const opacity = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, -120, -35],
      outputRange: [0, 1, 0],
    });
    return {
      opacity,
    };
  };

  const resetPosition = () => {
    Animated.timing(position, {
      toValue: { x: 0, y: 0 },
      duration: 200,
      useNativeDriver: false, // Set this to true if the animation supports it
    }).start();
  };

  const resetPositionAfterEntryDelete = () => {
    position.setValue({ x: 0, y: 0 });
  };

  const completeSwipe = (dimension) => {
    const x = dimension === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: FORCING_DURATION,
      useNativeDriver: false, // Set this to true if the animation supports it
    }).start(() => {
      handleDeleteEntry(id);
      deleteButtonPressed(id);
      resetPositionAfterEntryDelete();
    });
  };

  const enableScrollView = (isEnabled) => {
    swipingCheck(isEnabled);
  };

  const userSwipedLeft = (gesture) => {
    if (gesture.dx <= -RIGHT_BUTTON_THRESHOLD) {
      showButton("left");
    } else {
      resetPosition();
    }
  };

  const showButton = (side) => {
    const x = side === "right" ? SCREEN_WIDTH / 4 : -SCREEN_WIDTH / 2.5;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 400,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false, // Set this to true if the animation supports it
    }).start(() => enableScrollView(false));
  };

  return (
    <View style={styles.containerStyle}>
      <Animated.View
        style={[styles.textContainer, position.getLayout()]}
        {...PanResponder.create({
          onStartShouldSetPanResponder: () => false,
          onMoveShouldSetPanResponder: () => true,
          onResponderTerminationRequest: () => false,
          onPanResponderGrant: () => {
            position.setOffset({ x: position.x._value, y: 0 });
            position.setValue({ x: 0, y: 0 });
          },
          onPanResponderMove: (event, gesture) => {
            if (gesture.dx <= -SCROLL_THRESHOLD) {
              enableScrollView(true);
              const x = gesture.dx + SCROLL_THRESHOLD;
              position.setValue({ x, y: 0 });
            }
          },
          onPanResponderRelease: (event, gesture) => {
            position.flattenOffset();
            if (gesture.dx <= -RIGHT_BUTTON_THRESHOLD) {
              userSwipedLeft(gesture);
            } else {
              resetPosition();
            }
          },
          onPanResponderTerminate: () => {
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false, // Set this to true if the animation supports it
            }).start();
          },
        }).panHandlers}
      >
        <View style={styles.entryInfo}>
          <Text style={styles.entryFoodNameText}>{itemData.foodName}</Text>
          <Text style={styles.entryCaloriesText}>{itemData.foodCalories}</Text>
        </View>
      </Animated.View>

      <Animated.View
        style={[styles.rightButtonContainer, { left: SCREEN_WIDTH / 2 }]}
      >
        <TouchableOpacity onPress={() => completeSwipe("left")}>
          <Text style={styles.textStyle}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[
          styles.rightButtonContainer,
          { backgroundColor: "#FFC400", left: SCREEN_WIDTH / 1.4 },
          getRightButtonProps(),
        ]}
      >
        <TouchableOpacity onPress={editButtonPressed}>
          <Text style={styles.textStyle}>Edit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SwipeableFoodEntryItem;
