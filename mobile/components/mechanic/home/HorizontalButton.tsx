import { Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";

interface Props {
  buttonText: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function HorizontalButton({
  buttonText,
  isSelected,
  onPress,
}: Props) {
  return (
    <Pressable onPress={onPress}>
      <Text
        style={[
          styles.weekText,
          !isSelected && { backgroundColor: Colors.light.inactiveButton },
        ]}
      >
        {buttonText}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  weekText: {
    fontFamily: "Jaldi-Bold",
    fontSize: 20,
    backgroundColor: Colors.light.specialBlue,
    color: Colors.light.darkButtonText,
    padding: 20,
    borderRadius: 30,
    minWidth: 80,
    textAlign: "center",
  },
});
