import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import { ScrollViewProps, Animated, ScrollView } from "react-native";

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
