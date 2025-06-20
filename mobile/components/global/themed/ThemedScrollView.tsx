import { ScrollView, ScrollViewProps } from "react-native";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";
import { useCallback, useRef } from "react";
import { useFocusEffect } from "expo-router";

export default function ThemedScrollView({ style, ...props }: ScrollViewProps) {
  const { staticColors } = useAnimatedTheme();

  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      return () => {
        scrollRef.current?.scrollTo({ y: 0 });
      };
    }, [])
  );

  return (
    <ScrollView
      ref={scrollRef}
      style={[style, { backgroundColor: staticColors.background }]}
      {...props}
    />
  );
}
