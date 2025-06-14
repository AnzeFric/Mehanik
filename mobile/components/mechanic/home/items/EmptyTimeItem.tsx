import { TouchableOpacity, StyleSheet } from "react-native";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedView from "@/components/global/themed/ThemedView";

interface Props {
  itemHeight: number;
  onPress: () => void;
}

export default function EmptyTimeItem({ itemHeight, onPress }: Props) {
  return (
    <ThemedView
      type={"primary"}
      style={[styles.container, { height: itemHeight }]}
    >
      <TouchableOpacity onPress={onPress} style={styles.content}>
        <ThemedText type={"small"}>Prazen termin</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
