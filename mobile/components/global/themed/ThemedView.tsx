import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import { ViewProps, Animated } from "react-native";

export default function ThemedView({ style, ...props }: ViewProps) {
  const { animated } = useAnimatedTheme();

  return (
    <Animated.View
      style={[style, { backgroundColor: animated.backgroundColor }]}
      {...props}
    />
  );
}
