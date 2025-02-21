import { Text, View, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import HorizontalButton from "./HorizontalButton";

const days = ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"];
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

export default function DaySchedule() {
  const [selectedDay, setSelectedDay] = useState<string>(days[0]);

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
  };

  return (
    <View>
      <ScrollView
        style={{ maxHeight: 100 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          {days.map((day, index) => (
            <HorizontalButton
              buttonText={day}
              isSelected={selectedDay === day}
              onPress={() => handleDaySelect(day)}
              key={index}
            />
          ))}
        </View>
      </ScrollView>
      <ScrollView style={styles.scrollContainer}>
        {times.map((time, index) => (
          <View style={{ display: "flex", flex: 1 }}>
            <Text key={index} style={styles.timeText}>
              {time}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  scrollContainer: {
    backgroundColor: "red",
    marginTop: 20,
  },
  scrollContent: {
    paddingVertical: 10,
  },
  timeText: {
    fontSize: 16,
    marginVertical: 5,
  },
});
