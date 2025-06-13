import DatePicker, { DatePickerProps } from "react-native-date-picker";
import { useTheme } from "@/context/ThemeContext";

export default function ThemedDatePicker({ ...props }: DatePickerProps) {
  const { selectedTheme } = useTheme();

  // Date picker options: light, dark and auto
  // If we use other themes it defaults to auto
  const theme =
    selectedTheme === "light"
      ? "light"
      : selectedTheme === "dark"
        ? "dark"
        : "auto";

  return <DatePicker {...props} theme={theme} />;
}
