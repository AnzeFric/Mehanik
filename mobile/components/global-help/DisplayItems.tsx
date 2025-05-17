import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useCallback, useRef } from "react";
import { useFocusEffect } from "expo-router";

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

  // Make ScrollView return to top after screen is unfocused
  useFocusEffect(
    useCallback(() => {
      return () => {
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ y: 0 });
          }
        }, 100); // For smooth transition between screens
      };
    }, [])
  );

  return (
    <ScrollView style={styles.scrollContainer} ref={scrollRef}>
      <View style={styles.container}>
        {list.length > 0 ? (
          list.map((item, index) => renderItem(item, index))
        ) : (
          <Text style={styles.text}>{emptyMessage}</Text>
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
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});
