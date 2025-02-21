import { ScrollView, Text, StyleSheet } from "react-native";

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
      {times.map((time, index) => (
        <Text key={index} style={styles.timeText}>
          {selectedDay} - {time}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  timeText: {
    fontSize: 16,
    marginVertical: 5,
  },
});
