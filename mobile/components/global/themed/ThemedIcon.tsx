import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

type IoniconsProps = ComponentProps<typeof Ionicons>;

export default function ThemedIcon({ style, ...props }: IoniconsProps) {
  const { staticColors } = useAnimatedTheme();

  return <Ionicons {...props} style={{ color: staticColors.activeIcon }} />;
}
