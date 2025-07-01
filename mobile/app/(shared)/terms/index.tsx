import { View, StyleSheet } from "react-native";
import { useState, useMemo, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import TitleRow from "@/components/global/TitleRow";
import TermsItem from "@/components/global/terms/TermsItem";
import { items } from "@/constants/data/terms.json";
import ThemedScrollView from "@/components/global/themed/ThemedScrollView";
import ThemedSearchInput from "@/components/global/themed/ThemedSearchInput";

export default function TermsScreen() {
  const [value, setValue] = useState("");

  const terms = useMemo(() => {
    return items;
  }, [items]);

  const filteredTerms = terms.filter(
    (item) =>
      item.title.toLowerCase().includes(value.toLowerCase()) ||
      item.description.toLowerCase().includes(value.toLowerCase())
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setValue("");
      };
    }, [])
  );

  return (
    <ThemedScrollView>
      <TitleRow title={"Pogoji in določila"} hasBackButton={true} />
      <View style={styles.contentContainer}>
        <ThemedSearchInput value={value} onChangeText={setValue} />
        <View style={{ gap: 10 }}>
          {filteredTerms.map((item, index) => (
            <TermsItem id={item.id} title={item.title} key={index} />
          ))}
        </View>
      </View>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    gap: 30,
  },
});
