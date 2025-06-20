import { TextInput, TextInputProps } from "react-native";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";

export default function ThemedTextInput({ style, ...props }: TextInputProps) {
  const { staticColors } = useAnimatedTheme();

  return (
    <TextInput
      {...props}
      placeholderTextColor={staticColors.secondaryText}
      style={[style, { color: staticColors.primaryText }]}
    />
  );
}
