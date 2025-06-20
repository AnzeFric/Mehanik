import { TouchableOpacity, StyleSheet } from "react-native";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedView from "@/components/global/themed/ThemedView";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";

interface Props {
  itemHeight: number;
  onPress: () => void;
}

export default function EmptyTimeItem({ itemHeight, onPress }: Props) {
  const { staticColors } = useAnimatedTheme();

  const containerStyle = [
    styles.container,
    { height: itemHeight, borderColor: staticColors.inactiveBorder },
  ];

  return (
    <ThemedView type={"primary"} style={containerStyle}>
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
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
