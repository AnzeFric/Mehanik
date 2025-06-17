import { ScrollView, ScrollViewProps, Animated } from "react-native";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import { useCallback, useRef } from "react";
import { useFocusEffect } from "expo-router";

type Props = ScrollViewProps & {
  animatedTheme?: boolean;
};

export default function ThemedScrollView({
  style,
  animatedTheme = false,
  ...props
}: Props) {
  const { animated, staticColors } = useAnimatedTheme();

  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      return () => {
        scrollRef.current?.scrollTo({ y: 0 });
      };
    }, [])
  );

  return animatedTheme ? (
    <Animated.ScrollView
      ref={scrollRef}
      style={[style, { backgroundColor: animated.backgroundColor }]}
      {...props}
    />
  ) : (
    <ScrollView
      ref={scrollRef}
      style={[style, { backgroundColor: staticColors.background }]}
      {...props}
    />
  );
}
