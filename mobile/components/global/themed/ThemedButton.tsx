import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from "react-native";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import { AppStyles } from "@/constants/Styles";
import ThemedText from "./ThemedText";

type ButtonType = "small" | "large" | "option" | "option-destroy";

type Props = TouchableOpacityProps & {
  buttonType: ButtonType;
  buttonText: string;
  selected?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
};

export default function ThemedButton({
  buttonType,
  buttonText,
  selected = true,
  buttonStyle = {},
  buttonTextStyle = {},
  ...props
}: Props) {
  const { staticColors } = useAnimatedTheme();

  const typeToButtonStyle: Record<ButtonType, StyleProp<ViewStyle>> = {
    small: AppStyles.button,
    large: AppStyles.bigButton,
    option: styles.optionButton,
    "option-destroy": styles.optionButton,
  };

  const typeToTextColors: Record<ButtonType, string> = {
    small: staticColors.buttonText,
    large: staticColors.bigButtonText,
    option: staticColors.buttonOptionText,
    "option-destroy": staticColors.buttonOptionText,
  };

  const activeColors: Record<ButtonType, string> = {
    small: staticColors.button,
    large: staticColors.bigButton,
    option: staticColors.buttonOption,
    "option-destroy": staticColors.destroyButton,
  };

  const inactiveColors: Record<ButtonType, string> = {
    small: staticColors.inactiveButton,
    large: staticColors.inactiveButton,
    option: staticColors.inactiveButton,
    "option-destroy": staticColors.inactiveButton,
  };

  const buttonStyles = [
    typeToButtonStyle[buttonType],
    {
      backgroundColor: selected
        ? activeColors[buttonType]
        : inactiveColors[buttonType],
    },
    buttonStyle,
  ];

  const buttonTextStyles = [
    {
      color: typeToTextColors[buttonType],
    },
    buttonTextStyle,
  ];

  return (
    <>
      {buttonType === "small" && (
        <TouchableOpacity style={buttonStyles} {...props}>
          <ThemedText type={"normal"} bold style={buttonTextStyles}>
            {buttonText}
          </ThemedText>
        </TouchableOpacity>
      )}
      {buttonType === "large" && (
        <TouchableOpacity style={buttonStyles} {...props}>
          <ThemedText type={"title"} bold style={buttonTextStyles}>
            {buttonText}
          </ThemedText>
        </TouchableOpacity>
      )}
      {buttonType === "option" && (
        <TouchableOpacity style={buttonStyles} {...props}>
          <ThemedText type={"small"} bold style={buttonTextStyles}>
            {buttonText}
          </ThemedText>
        </TouchableOpacity>
      )}
      {buttonType === "option-destroy" && (
        <TouchableOpacity style={buttonStyles} {...props}>
          <ThemedText type={"small"} bold style={buttonTextStyles}>
            {buttonText}
          </ThemedText>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});
