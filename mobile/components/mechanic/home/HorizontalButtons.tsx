import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const days = ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"];

export default function HorizontalButtons() {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ paddingBottom: 30 }}
    >
      <View style={styles.container}>
        {days.map((item, index) => (
          <Text style={styles.weekText} key={index}>
            {item}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
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
