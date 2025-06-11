import { Text, StyleSheet, TouchableOpacity } from "react-native";
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
    <TouchableOpacity
      style={[
        styles.radioButton,
        currentValue === value && styles.radioButtonSelected,
      ]}
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
    </TouchableOpacity>
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
    color: Colors.light.primaryText,
    fontWeight: "bold",
  },
});
