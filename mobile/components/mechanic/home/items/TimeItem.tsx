import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";

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
      <Text style={[AppStyles.text, { alignSelf: "center" }]}>{text}</Text>
      <View style={{ flexShrink: 1 }}>
        <View style={styles.customer}>
          <Text style={AppStyles.text}>Ime Priimek</Text>
          <Text style={AppStyles.text}>Škoda Octavia</Text>
        </View>
        <Text style={AppStyles.smallText}>
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
  customer: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 10,
    justifyContent: "space-between",
  },
});
