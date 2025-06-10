import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import { ScrollViewProps, Animated } from "react-native";

export default function ThemedScrollView({ style, ...props }: ScrollViewProps) {
  const { animated } = useAnimatedTheme();

  return (
    <Animated.ScrollView
      style={[style, { backgroundColor: animated.backgroundColor }]}
      {...props}
    />
  );
}
