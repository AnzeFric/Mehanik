import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const times = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

interface TimeListProps {
  selectedDay: string;
}

/*
TODO:
  1. V komponento spravi item-e
  2. Naredi, da se naredi modal pop up, ko se klikne na item. Prikaže celoten opis
*/

export default function TimeList({ selectedDay }: TimeListProps) {
  return (
    <ScrollView>
      {times.map((time, index) => (
        <View key={index} style={styles.container}>
          <Text style={[styles.text, { alignSelf: "center" }]}>{time}</Text>
          <View style={{ flexShrink: 1 }}>
            <View style={styles.customer}>
              <Text style={styles.text}>Ime Priimek</Text>
              <Text style={styles.text}>Škoda Octavia</Text>
            </View>
            <Text style={styles.textSmall}>
              Nek daljši opis ob vnosu termina iz strani avtomehanika. Recimo
              redni servis, ali menjava zavornih ploščic...
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
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
