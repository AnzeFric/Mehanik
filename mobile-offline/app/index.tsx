import { Redirect } from "expo-router";
import ThemedView from "@/components/global/themed/ThemedView";

export default function HomeScreen() {
  return (
    <ThemedView type={"background"} style={{ flex: 1 }}>
      <Redirect href="/(tabs)" />
    </ThemedView>
  );
}
