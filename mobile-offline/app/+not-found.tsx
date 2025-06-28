import ThemedText from "@/components/global/themed/ThemedText";
import ThemedView from "@/components/global/themed/ThemedView";
import TitleRow from "@/components/global/TitleRow";
import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

export default function NotFoundScreen() {
  const { staticColors } = useAnimatedTheme();

  return (
    <ThemedView type={"background"} style={{ flex: 1 }}>
      <TitleRow title={"Screen does not exist"} hasBackButton={true} />
      <View style={styles.container}>
        <ThemedText type={"normal"}>This screen doesn't exist</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText
            type={"normal"}
            style={{ fontStyle: "italic", color: staticColors.specialBlue }}
          >
            Go to home screen
          </ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  link: {
    marginTop: 15,
    borderBottomWidth: 1,
  },
});
