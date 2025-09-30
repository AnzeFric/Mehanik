import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { useRef } from "react";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import ThemedIcon from "./ThemedIcon";
import { useTranslation } from "react-i18next";

type Props = TextInputProps & {
  viewStyle?: StyleProp<ViewStyle>;
};

export default function ThemedSearchInput({ viewStyle = {}, ...props }: Props) {
  const { staticColors } = useAnimatedTheme();

  const { t } = useTranslation();

  const inputRef = useRef<TextInput>(null);

  const viewStyles = [
    styles.inputContainer,
    {
      borderColor: staticColors.inputBorder,
      backgroundColor: staticColors.inputBackground,
    },
    viewStyle,
  ];

  return (
    <View style={viewStyles}>
      <TextInput
        ref={inputRef}
        placeholder={t("components.global.search")}
        placeholderTextColor={staticColors.inputText}
        style={[styles.input, { color: staticColors.inputText }]}
        {...props}
      />
      <ThemedIcon
        name={"search-outline"}
        size={20}
        onPress={() => inputRef.current?.focus()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 10,
  },
  input: {
    height: 50,
    flex: 1,
  },
});
