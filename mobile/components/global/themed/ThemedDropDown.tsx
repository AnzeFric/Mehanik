import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";
import ThemedText from "./ThemedText";

interface Props {
  items: Array<any>;
  onPress: (value: any) => void;
}

export default function ThemedDropDown({ items, onPress }: Props) {
  const { staticColors } = useAnimatedTheme();

  return (
    <ScrollView
      style={[
        styles.optionsContainer,
        { backgroundColor: staticColors.secondaryBackground },
      ]}
      nestedScrollEnabled
      keyboardShouldPersistTaps={"handled"}
    >
      {items.map((item, index) => (
        <TouchableOpacity
          style={styles.option}
          onPress={() => onPress(item)}
          key={index}
        >
          <ThemedText type={"small"}>{item}</ThemedText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    borderWidth: 0.5,
    borderRadius: 4,
    maxHeight: 200,
  },
  option: {
    borderBottomWidth: 0.8,
    paddingVertical: 12,
    marginHorizontal: 15,
    borderStyle: "dashed",
  },
});
