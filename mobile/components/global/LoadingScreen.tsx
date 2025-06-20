import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";
import ThemedText from "./themed/ThemedText";
import ThemedView from "./themed/ThemedView";

type LoadingType = "full" | "partial";

interface Props {
  type: LoadingType;
  text: string;
  style?: StyleProp<ViewStyle>;
}

export default function LoadingScreen({ type, text, style = {} }: Props) {
  const { staticColors } = useAnimatedTheme();

  return (
    <ThemedView type={"background"} style={[styles.container, style]}>
      <ActivityIndicator size={"large"} color={staticColors.specialBlue} />
      {type === "full" ? (
        <ThemedText type={"normal"} style={{ marginTop: 10 }}>
          {text}
        </ThemedText>
      ) : (
        <ThemedText type={"small"} style={{ marginTop: 10 }}>
          {text}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
