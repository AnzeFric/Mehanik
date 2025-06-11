import { View, StyleSheet } from "react-native";
import TitleRow from "@/components/shared/TitleRow";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { items } from "@/data/terms/terms.json";
import { Terms } from "@/data/terms/terms";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import { AppStyles } from "@/constants/Styles";

export default function TermsAndConditionsItem() {
  const { id } = useLocalSearchParams();

  const data: Terms | undefined = useMemo(() => {
    return items.find((item) => item.id === Number(id));
  }, [id]);

  if (!data) {
    return (
      <ThemedView type={"background"} style={styles.container}>
        <TitleRow title={"Item not found"} hasBackButton={true} />
        <View style={AppStyles.parentPadding}>
          <ThemedText style={AppStyles.smallText}>
            Return to the previous page and try again.
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView type={"background"} style={styles.container}>
      <TitleRow title={data.title} hasBackButton={true} />
      <View style={AppStyles.parentPadding}>
        <ThemedText style={AppStyles.smallText}>{data.description}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
