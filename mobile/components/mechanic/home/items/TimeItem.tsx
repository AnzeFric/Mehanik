import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

/*
TODO:
    onClick: Se prikaže modal z celotnim opisom in podrobnimi info
*/

interface Props {
  text: string;
}

export default function TimeItem({ text }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { alignSelf: "center" }]}>{text}</Text>
      <View style={{ flexShrink: 1 }}>
        <View style={styles.customer}>
          <Text style={styles.text}>Ime Priimek</Text>
          <Text style={styles.text}>Škoda Octavia</Text>
        </View>
        <Text style={styles.textSmall}>
          Nek daljši opis ob vnosu termina iz strani avtomehanika. Recimo redni
          servis, ali menjava zavornih ploščic...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 5,
    gap: 20,
    borderColor: Colors.light.specialBlue,
    borderBottomWidth: 2.5,
    borderStyle: "dashed",
  },
  text: {
    fontSize: 16,
    fontFamily: "Jaldi-Regulat",
    lineHeight: 16,
  },
  textSmall: {
    fontSize: 14,
    fontFamily: "Jaldi-Regulat",
  },
  customer: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 10,
    justifyContent: "space-between",
  },
});
