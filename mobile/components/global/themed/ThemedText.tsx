import { Text, TextProps, Animated, TextStyle } from "react-native";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

type TextTypes =
  | "extraSmall"
  | "small"
  | "normal"
  | "title"
  | "bigTitle"
  | "xxlTitle";

type Props = TextProps & {
  animatedTheme?: boolean;
  bold?: boolean;
  type: TextTypes;
};

export default function ThemedText({
  style,
  type,
  bold = false,
  animatedTheme = false,
  ...props
}: Props) {
  const { animated, staticColors } = useAnimatedTheme();

  const typeToSize: Record<TextTypes, number> = {
    extraSmall: 14,
    small: 16,
    normal: 20,
    title: 24,
    bigTitle: 32,
    xxlTitle: 44,
  };

  const staticStyle: TextStyle = {
    fontWeight: bold ? "bold" : "normal",
    fontSize: typeToSize[type],
    color: staticColors.primaryText,
  };

  const animatedStyle: Animated.WithAnimatedObject<TextStyle> = {
    fontWeight: bold ? "bold" : "normal",
    fontSize: typeToSize[type],
    color: animated.primaryColor,
  };

  return animatedTheme ? (
    <Animated.Text style={[animatedStyle, style]} {...props} />
  ) : (
    <Text style={[staticStyle, style]} {...props} />
  );
}
