import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { Controller, FieldValues, Control, Path } from "react-hook-form";
import { Colors } from "@/constants/Colors";

interface Props<T extends FieldValues> {
  control?: Control<T>;
  name: Path<T>;
  text: string;
}

export default function CustomCheckBox<T extends FieldValues>({
  control,
  name,
  text,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View style={styles.checkboxRow}>
          <TouchableHighlight
            style={[styles.checkbox, value && styles.checkboxSelected]}
            underlayColor={Colors.light.underlayColor}
            onPress={() => onChange(!value)}
          >
            <></>
          </TouchableHighlight>
          <Text style={styles.checkboxLabel}>{text}</Text>
        </View>
      )}
    />
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
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  checkboxLabel: {
    fontSize: 18,
  },
});
