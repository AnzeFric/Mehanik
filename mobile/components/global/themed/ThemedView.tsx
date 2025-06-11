import { View, ViewProps, Animated } from "react-native";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

type ViewTypes = "background" | "primary" | "secondary";

type Props = ViewProps & {
  type: ViewTypes;
  animatedTheme?: boolean;
};

export default function ThemedView({
  type,
  animatedTheme = false,
  style,
  ...props
}: Props) {
  const { animated, staticColors } = useAnimatedTheme();

  const animatedTypeToColor: Record<
    ViewTypes,
    Animated.AnimatedInterpolation<string | number>
  > = {
    background: animated.backgroundColor,
    primary: animated.primaryBackground,
    secondary: animated.secondaryBackground,
  };

  const staticTypeToColor: Record<ViewTypes, string> = {
    background: staticColors.backgroundColor,
    primary: staticColors.primaryBackground,
    secondary: staticColors.secondaryBackground,
  };

  return animatedTheme ? (
    <Animated.View
      style={[style, { backgroundColor: animatedTypeToColor[type] }]}
      {...props}
    />
  ) : (
    <View
      style={[style, { backgroundColor: staticTypeToColor[type] }]}
      {...props}
    />
  );
}
