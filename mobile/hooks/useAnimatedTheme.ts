import { useRef, useEffect } from "react";
import { Animated } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { lightTheme, darkTheme } from "@/constants/Themes";

export const useAnimatedTheme = () => {
  const { theme } = useTheme();

  const animatedValue = useRef(
    new Animated.Value(theme === darkTheme ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: theme === darkTheme ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [theme]);

  const animatedColors = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [lightTheme.colors.background, darkTheme.colors.background],
    }),
    textColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [lightTheme.colors.text, darkTheme.colors.text],
    }),
    primaryColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [lightTheme.colors.primary, darkTheme.colors.primary],
    }),
    secondaryTextColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        lightTheme.colors.textSecondary,
        darkTheme.colors.textSecondary,
      ],
    }),
    borderColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [lightTheme.colors.border, darkTheme.colors.border],
    }),
    iconColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [lightTheme.colors.icon, darkTheme.colors.icon],
    }),
  };

  const staticColors = {
    backgroundColor: theme.colors.background,
    textColor: theme.colors.text,
    primaryColor: theme.colors.primary,
    secondaryTextColor: theme.colors.textSecondary,
    borderColor: theme.colors.border,
    iconColor: theme.colors.icon,
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
