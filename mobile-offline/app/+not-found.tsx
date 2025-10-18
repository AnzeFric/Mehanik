import ThemedText from "@/components/global/themed/ThemedText";
import ThemedView from "@/components/global/themed/ThemedView";
import TitleRow from "@/components/global/TitleRow";
import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import { useTranslation } from "react-i18next";
import "../assets/i18n/i18n";

export default function NotFoundScreen() {
  const { staticColors } = useAnimatedTheme();
  const { t } = useTranslation();

  return (
    <ThemedView type={"background"} style={styles.container}>
      <TitleRow title={"Not found"} hasBackButton={false} />
      <View style={styles.contentContainer}>
        <ThemedText type={"normal"}>
          {t("screens.notFound.text.text")}
        </ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText
            type={"normal"}
            style={{ fontStyle: "italic", color: staticColors.specialBlue }}
          >
            {t("screens.notFound.text.link")}
          </ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
    paddingHorizontal: 20,
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  link: {
    marginTop: 15,
    borderBottomWidth: 1,
  },
});
