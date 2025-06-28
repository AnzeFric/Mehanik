import { View, ViewProps } from "react-native";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

type ViewTypes = "background" | "primary" | "secondary";

type Props = ViewProps & {
  type: ViewTypes;
};

export default function ThemedView({ type, style, ...props }: Props) {
  const { staticColors } = useAnimatedTheme();

  const typeToColor: Record<ViewTypes, string> = {
    background: staticColors.background,
    primary: staticColors.primaryBackground,
    secondary: staticColors.secondaryBackground,
  };

  return (
    <View style={[style, { backgroundColor: typeToColor[type] }]} {...props} />
  );
}
