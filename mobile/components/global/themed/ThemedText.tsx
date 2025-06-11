import { Text, TextProps, Animated } from "react-native";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

type Props = TextProps & {
  animatedTheme?: boolean;
};

export default function ThemedText({
  style,
  animatedTheme = false,
  ...props
}: Props) {
  const { animated, staticColors } = useAnimatedTheme();

  return animatedTheme ? (
    <Animated.Text
      style={[style, { color: animated.primaryColor }]}
      {...props}
    />
  ) : (
    <Text style={[style, { color: staticColors.primaryText }]} {...props} />
  );
}
