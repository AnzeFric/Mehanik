import { StatusBar, StatusBarProps } from "react-native";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

export default function ThemedStatusBar({ ...props }: StatusBarProps) {
  const { staticColors } = useAnimatedTheme();

  return (
    <StatusBar backgroundColor={staticColors.backgroundColor} {...props} />
  );
}
