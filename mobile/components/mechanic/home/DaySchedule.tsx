import { View, StyleSheet } from "react-native";
import { useState } from "react";
import DaySelector from "./DaySelector";
import TimeList from "./TimeList";

const days = ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"];

export default function DaySchedule() {
  const [selectedDay, setSelectedDay] = useState<string>(days[0]);

  return (
    <View style={styles.container}>
      <View style={styles.daySelectorContainer}>
        <DaySelector selectedDay={selectedDay} onDaySelect={setSelectedDay} />
      </View>
      <TimeList selectedDay={selectedDay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    flex: 1,
  },
  daySelectorContainer: {
    paddingHorizontal: 15,
  },
});
