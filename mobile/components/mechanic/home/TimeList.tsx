import { View, ScrollView, StyleSheet } from "react-native";
import TimeItem from "./items/TimeItem";

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

export default function TimeList({ selectedDay }: TimeListProps) {
  return (
    <ScrollView>
      <View style={styles.container}>
        {times.map((time, index) => (
          <TimeItem key={index} text={time} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
});
