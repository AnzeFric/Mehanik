import { View, StyleSheet } from "react-native";
import TitleRow from "@/components/global/TitleRow";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { items } from "@/constants/data/terms.json";
import { Terms } from "@/interfaces/terms";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";

export default function TermsAndConditionsItem() {
  const { id } = useLocalSearchParams();

  const data: Terms | undefined = useMemo(() => {
    return items.find((item) => item.id === Number(id));
  }, [id]);

  return (
    <ThemedView type={"background"} style={{ flex: 1 }}>
      <TitleRow
        title={data ? data.title : "Item not found"}
        hasBackButton={true}
      />
      <View style={styles.container}>
        <ThemedText type={"small"}>
          {data
            ? data.description
            : "Return to the previous page and try again."}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
});
