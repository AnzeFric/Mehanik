import { StatusBar, StatusBarProps, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

type Props = StatusBarProps & {
  animatedTheme?: boolean;
};

export default function ThemedStatusBar({
  animatedTheme = false,
  ...props
}: Props) {
  const { animated, staticColors } = useAnimatedTheme();
  const insets = useSafeAreaInsets();

  return animatedTheme ? (
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
  ) : (
    <StatusBar backgroundColor={staticColors.backgroundColor} {...props} />
  );
}
