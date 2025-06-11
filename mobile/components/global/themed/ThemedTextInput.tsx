import { TextInput, TextInputProps } from "react-native";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

export default function ThemedTextInput({ style, ...props }: TextInputProps) {
  const { staticColors } = useAnimatedTheme();

  return (
    <TextInput
      {...props}
      placeholderTextColor={staticColors.primaryText}
      style={[style, { color: staticColors.primaryText }]}
    />
  );
}
