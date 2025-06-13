import { ActivityIndicator, StyleSheet } from "react-native";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import ThemedText from "./themed/ThemedText";
import ThemedView from "./themed/ThemedView";

export default function LoadingScreen() {
  const { staticColors } = useAnimatedTheme();

  return (
    <ThemedView type={"background"} style={styles.container}>
      <ActivityIndicator size={"large"} color={staticColors.specialBlue} />
      <ThemedText type={"normal"} style={{ marginTop: 10 }}>
        Nalaganje...
      </ThemedText>
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
