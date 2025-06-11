import { TextInput, TextInputProps, View } from "react-native";
import { useRef } from "react";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import ThemedIcon from "./ThemedIcon";
import { AppStyles } from "@/constants/Styles";

export default function ThemedSearchInput({ ...props }: TextInputProps) {
  const { staticColors } = useAnimatedTheme();
  const inputRef = useRef<TextInput>(null);

  return (
    <View
      style={[
        AppStyles.inputContainer,
        {
          borderColor: staticColors.inputBorder,
          backgroundColor: staticColors.inputBackground,
        },
      ]}
    >
      <TextInput
        style={[AppStyles.input]}
        placeholder={"Iskanje"}
        placeholderTextColor={staticColors.primaryText}
        value={props.value}
        onChangeText={props.onChangeText}
        ref={inputRef}
      />
      <ThemedIcon
        name={"search-outline"}
        size={20}
        onPress={() => inputRef.current?.focus()}
      />
    </View>
  );
}
