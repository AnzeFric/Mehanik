import { useRef, useEffect } from "react";
import { Animated } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Colors } from "@/constants/Colors";

export const useAnimatedTheme = () => {
  const { theme } = useTheme();

  const animatedValue = useRef(
    new Animated.Value(theme === Colors.dark ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: theme === Colors.dark ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [theme]);

  const animatedColors = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.light.background, Colors.dark.background],
    }),
    primaryBackground: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        Colors.light.primaryBackground,
        Colors.dark.primaryBackground,
      ],
    }),
    secondaryBackground: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        Colors.light.secondaryBackground,
        Colors.dark.secondaryBackground,
      ],
    }),
    primaryColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.light.primaryText, Colors.dark.primaryText],
    }),
    secondaryTextColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.light.secondaryText, Colors.dark.secondaryText],
    }),
    borderColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.light.inactiveBorder, Colors.dark.inactiveBorder],
    }),
    iconColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.light.activeIcon, Colors.dark.activeIcon],
    }),
  };

  const staticColors = {
    /* Backgrounds */
    background: theme.background,
    primaryBackground: theme.primaryBackground,
    secondaryBackground: theme.secondaryBackground,

    /* Texts */
    primaryText: theme.primaryText,
    secondaryText: theme.secondaryText,

    /* Buttons */
    button: theme.button,
    buttonText: theme.buttonText,
    bigButton: theme.bigButton,
    bigButtonText: theme.bigButtonText,
    buttonOption: theme.buttonOption,
    buttonOptionText: theme.buttonOptionText,
    inactiveButton: theme.inactiveButton,
    confirmButton: theme.confirmButton,
    cancelButton: theme.cancelButton,
    destroyButton: theme.destroyButton,
    utilityButton: theme.utilityButton,
    actionButton: theme.actionButton,
    actionButtonText: theme.actionButtonText,

    /* Statuses */
    accepted: theme.accepted,
    rejected: theme.rejected,
    changed: theme.changed,
    pending: theme.pending,

    /* Icons */
    activeIcon: theme.activeIcon,
    inactiveIcon: theme.inactiveIcon,
    blueIcon: theme.blueIcon,

    /* Inputs */
    inputBackground: theme.inputBackground,
    inputBorder: theme.inputBorder,
    inputText: theme.inputText,

    /* Borders */
    border: theme.border,
    inactiveBorder: theme.inactiveBorder,

    /* Other */
    specialBlue: theme.specialBlue,
    destructiveRed: theme.destructiveRed,
    datePicker: theme.datePicker,
  };

  return {
    // Animated values for Animated components
    animated: animatedColors,
    // Static values for regular components
    staticColors: staticColors,
    // Current theme reference
    theme,
  };
};
