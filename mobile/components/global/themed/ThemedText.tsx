import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import { TextProps, Animated } from "react-native";

export default function ThemedText({ style, ...props }: TextProps) {
  const { animated } = useAnimatedTheme();

  return (
    <Animated.Text style={[style, { color: animated.textColor }]} {...props} />
  );
}
