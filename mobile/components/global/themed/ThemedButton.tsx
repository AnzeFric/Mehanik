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
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
};

export default function ThemedButton({
  buttonType,
  buttonText,
  buttonStyle = {},
  buttonTextStyle = {},
  ...props
}: Props) {
  const { staticColors } = useAnimatedTheme();

  return buttonType === "small" ? (
    <TouchableOpacity style={[AppStyles.button, buttonStyle, {}]} {...props}>
      <Text style={[AppStyles.button, buttonTextStyle]}>{buttonText}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={[AppStyles.bigButton, buttonStyle, {}]} {...props}>
      <Text style={[AppStyles.bigButtonText, buttonTextStyle]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
}
