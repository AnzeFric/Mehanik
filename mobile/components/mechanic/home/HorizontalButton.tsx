import { Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface Props {
  buttonText: string;
}

export default function HorizontalButton({ buttonText }: Props) {
  return <Text style={styles.weekText}>{buttonText}</Text>;
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
