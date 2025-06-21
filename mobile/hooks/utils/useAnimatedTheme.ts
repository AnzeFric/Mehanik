import { useRef, useEffect } from "react";
import { Animated } from "react-native";
import { useTheme } from "../../context/ThemeContext";
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
    unknown: theme.unknown,

    /* Icons */
    activeIcon: theme.activeIcon,
    inactiveIcon: theme.inactiveIcon,
    blueIcon: theme.blueIcon,
    iconDestroy: theme.iconDestroy,
    iconWithDarkBackground: theme.iconWithDarkBackground,

    /* Inputs */
    inputBackground: theme.inputBackground,
    inputBorder: theme.inputBorder,
    inputText: theme.inputText,

    /* Borders */
    border: theme.border,
    inactiveBorder: theme.inactiveBorder,

    /* Switch */
    track: theme.track,
    thumb: theme.thumb,

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
