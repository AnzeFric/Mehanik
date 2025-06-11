import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import { AppStyles } from "@/constants/Styles";

type ButtonType = "small" | "large";

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

  return buttonType === "small" ? (
    <TouchableOpacity
      style={[
        AppStyles.button,
        {
          backgroundColor: selected
            ? staticColors.button
            : staticColors.inactiveButton,
        },
        buttonStyle,
      ]}
      {...props}
    >
      <Text style={[AppStyles.buttonText, buttonTextStyle]}>{buttonText}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        AppStyles.bigButton,
        {
          backgroundColor: selected
            ? staticColors.bigButton
            : staticColors.inactiveButton,
        },
        buttonStyle,
      ]}
      {...props}
    >
      <Text style={[AppStyles.bigButtonText, buttonTextStyle]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
}
