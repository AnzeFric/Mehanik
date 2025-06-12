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

type ButtonType = "small" | "large" | "option";

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

  const buttonStyles = [
    AppStyles.button,
    {
      backgroundColor: selected
        ? staticColors.button
        : staticColors.inactiveButton,
    },
    buttonStyle,
  ];

  const bigButtonStyles = [
    AppStyles.bigButton,
    {
      backgroundColor: selected
        ? staticColors.bigButton
        : staticColors.inactiveButton,
    },
    buttonStyle,
  ];

  const buttonOptionStyles = [
    styles.optionButton,
    {
      backgroundColor: selected
        ? staticColors.buttonOption
        : staticColors.inactiveButton,
    },
    buttonStyle,
  ];
  return (
    <>
      {buttonType === "small" && (
        <TouchableOpacity style={buttonStyles} {...props}>
          <ThemedText
            type={"normal"}
            bold
            style={[{ color: staticColors.buttonText }, buttonTextStyle]}
          >
            {buttonText}
          </ThemedText>
        </TouchableOpacity>
      )}
      {buttonType === "large" && (
        <TouchableOpacity style={bigButtonStyles} {...props}>
          <ThemedText
            type={"title"}
            bold
            style={[{ color: staticColors.bigButtonText }, buttonTextStyle]}
          >
            {buttonText}
          </ThemedText>
        </TouchableOpacity>
      )}
      {buttonType === "option" && (
        <TouchableOpacity style={buttonOptionStyles} {...props}>
          <ThemedText
            type={"small"}
            bold
            style={[{ color: staticColors.buttonOptionText }, buttonTextStyle]}
          >
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
