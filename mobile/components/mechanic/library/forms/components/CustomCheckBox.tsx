import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface Props {
  text: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function CustomCheckBox({ text, value, onChange }: Props) {
  return (
    <View style={styles.checkboxRow}>
      <TouchableHighlight
        style={[styles.checkbox, value && styles.checkboxSelected]}
        underlayColor={Colors.light.underlayColor}
        onPress={() => onChange(!value)}
      >
        <View />
      </TouchableHighlight>
      <Text style={styles.checkboxLabel}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: Colors.light.inactiveBorder,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: Colors.light.specialBlue,
    borderColor: Colors.light.specialBlue,
  },
  checkboxLabel: {
    fontSize: 18,
  },
});
