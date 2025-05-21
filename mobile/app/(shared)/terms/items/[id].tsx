import { Text, View, StyleSheet } from "react-native";
import TitleRow from "@/components/shared/TitleRow";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { items } from "@/data/terms/terms.json";
import { Terms } from "@/data/terms/terms";

export default function TermsAndConditionsItem() {
  const { id } = useLocalSearchParams();

  const data: Terms | undefined = useMemo(() => {
    return items.find((item) => item.id === Number(id));
  }, [id]);

  if (!data) {
    return (
      <View>
        <TitleRow title={"Item not found"} hasBackButton={true} />
        <View style={styles.contentContainer}>
          <Text style={styles.text}>
            Return to the previous page and try again.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View>
      <TitleRow title={data.title} hasBackButton={true} />
      <View style={styles.contentContainer}>
        <Text style={styles.text}>{data.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  text: {
    fontSize: 15,
  },
});
