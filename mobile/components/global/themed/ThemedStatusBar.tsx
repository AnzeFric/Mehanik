import { StatusBar, StatusBarProps } from "react-native";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";

export default function ThemedStatusBar({ ...props }: StatusBarProps) {
  const { staticColors } = useAnimatedTheme();

  return <StatusBar backgroundColor={staticColors.background} {...props} />;
}
