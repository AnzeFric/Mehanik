import { useColorThemeStore } from "@/stores/useColorThemeStore";
import { Colors } from "@/constants/Colors";

export function useColorTheme() {
  const { isLight, changeColorTheme } = useColorThemeStore();
}
