import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

type IoniconsProps = ComponentProps<typeof Ionicons>;

export default function ThemedIcon({ style, ...props }: IoniconsProps) {
  const { staticColors } = useAnimatedTheme();

  return <Ionicons {...props} style={{ color: staticColors.iconColor }} />;
}
