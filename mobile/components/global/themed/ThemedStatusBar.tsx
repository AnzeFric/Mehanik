import { StatusBar, StatusBarProps, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

export default function ThemedStatusBar({ ...props }: StatusBarProps) {
  const { animated } = useAnimatedTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      {/* Transparent StatusBar */}
      <StatusBar backgroundColor="transparent" translucent {...props} />

      {/* Animated overlay that covers the status bar area */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: insets.top,
          backgroundColor: animated.backgroundColor,
          zIndex: 100,
        }}
      />
    </>
  );
}
