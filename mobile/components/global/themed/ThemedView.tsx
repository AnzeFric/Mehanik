import { View, ViewProps } from "react-native";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";

type ViewTypes = "background" | "primary" | "secondary";

type Props = ViewProps & {
  type: ViewTypes;
};

export default function ThemedView({ type, style, ...props }: Props) {
  const { staticColors } = useAnimatedTheme();

  const staticTypeToColor: Record<ViewTypes, string> = {
    background: staticColors.background,
    primary: staticColors.primaryBackground,
    secondary: staticColors.secondaryBackground,
  };

  return (
    <View
      style={[style, { backgroundColor: staticTypeToColor[type] }]}
      {...props}
    />
  );
}
