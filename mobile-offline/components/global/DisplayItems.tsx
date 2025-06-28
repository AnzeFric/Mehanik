import { View, StyleSheet, ScrollView } from "react-native";
import { useCallback, useRef } from "react";
import { useFocusEffect } from "expo-router";
import ThemedText from "./themed/ThemedText";

interface Props<T> {
  list: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
}

export default function DisplayItems<T>({
  list,
  renderItem,
  emptyMessage = "",
}: Props<T>) {
  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ y: 0 });
        }
      };
    }, [])
  );

  return (
    <ScrollView
      style={styles.scrollContainer}
      keyboardShouldPersistTaps={"handled"}
      ref={scrollRef}
    >
      <View style={styles.container}>
        {list.length > 0 ? (
          list.map((item, index) => renderItem(item, index))
        ) : (
          <ThemedText type={"normal"} style={{ textAlign: "center" }}>
            {emptyMessage}
          </ThemedText>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 25,
    flex: 1,
  },
  container: {
    gap: 10,
    paddingVertical: 20,
  },
});
