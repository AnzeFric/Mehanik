import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import ThemedText from "@/components/global/themed/ThemedText";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

interface Props {
  text: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function CustomCheckBox({ text, value, onChange }: Props) {
  const { staticColors } = useAnimatedTheme();

  return (
    <View style={styles.checkboxRow}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          value && {
            backgroundColor: staticColors.specialBlue,
            borderColor: staticColors.specialBlue,
          },
        ]}
        onPress={() => onChange(!value)}
      />
      <ThemedText type={"small"}>{text}</ThemedText>
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
});
