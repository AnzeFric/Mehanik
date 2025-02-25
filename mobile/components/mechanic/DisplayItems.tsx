import { View, Text, StyleSheet, ScrollView } from "react-native";

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
  return (
    <ScrollView style={styles.scrollContainer}>
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
    fontFamily: "Jaldi-Regular",
    textAlign: "center",
  },
});
