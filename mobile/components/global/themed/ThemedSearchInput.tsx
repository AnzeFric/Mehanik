import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { useRef } from "react";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import ThemedIcon from "./ThemedIcon";
import { AppStyles } from "@/constants/Styles";

type Props = TextInputProps & {
  viewStyle?: StyleProp<ViewStyle>;
};

export default function ThemedSearchInput({ viewStyle = {}, ...props }: Props) {
  const { staticColors } = useAnimatedTheme();
  const inputRef = useRef<TextInput>(null);

  const viewStyles = [
    AppStyles.inputContainer,
    {
      borderColor: staticColors.inputBorder,
      backgroundColor: staticColors.inputBackground,
    },
    viewStyle,
  ];

  return (
    <View style={viewStyles}>
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
