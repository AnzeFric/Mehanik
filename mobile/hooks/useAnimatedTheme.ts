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
    backgroundColor: theme.background,
    primaryBackground: theme.primaryBackground,
    secondaryBackground: theme.secondaryBackground,
    primaryColor: theme.primaryText,
    secondaryTextColor: theme.secondaryText,
    borderColor: theme.inactiveBorder,
    iconColor: theme.activeIcon,
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
