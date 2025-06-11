import { ScrollView, ScrollViewProps, Animated } from "react-native";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

type Props = ScrollViewProps & {
  animatedTheme?: boolean;
};

export default function ThemedScrollView({
  style,
  animatedTheme = false,
  ...props
}: Props) {
  const { animated, staticColors } = useAnimatedTheme();

  return animatedTheme ? (
    <Animated.ScrollView
      style={[style, { backgroundColor: animated.backgroundColor }]}
      {...props}
    />
  ) : (
    <ScrollView
      style={[style, { backgroundColor: staticColors.background }]}
      {...props}
    />
  );
}
