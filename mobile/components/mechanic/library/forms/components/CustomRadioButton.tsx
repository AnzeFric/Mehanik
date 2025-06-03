import { Text, TouchableHighlight, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface Props {
  currentValue: string;
  onChange: () => void;
  name: string;
  value: string;
}

export default function CustomRadioButton({
  currentValue,
  onChange,
  name,
  value,
}: Props) {
  return (
    <TouchableHighlight
      style={[
        styles.radioButton,
        currentValue === value && styles.radioButtonSelected,
      ]}
      underlayColor={Colors.light.underlayColor}
      onPress={onChange}
    >
      <Text
        style={[
          styles.radioText,
          currentValue === value && styles.radioTextSelected,
        ]}
      >
        {name}
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  radioButton: {
    backgroundColor: Colors.light.inactiveButton,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  radioButtonSelected: {
    backgroundColor: Colors.light.specialBlue,
  },
  radioText: {
    fontSize: 14,
  },
  radioTextSelected: {
    color: Colors.light.darkButtonText,
    fontWeight: "bold",
  },
});
