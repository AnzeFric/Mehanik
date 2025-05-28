import { View, StyleSheet } from "react-native";
import { useState } from "react";
import DaySelector from "./DaySelector";
import TimeList from "./TimeList";
import { useAppointment } from "@/hooks/useAppointment";

export default function DaySchedule() {
  const { days } = useAppointment();
  const [selectedDay, setSelectedDay] = useState<string>(days[0]);
  const [date, setDate] = useState<Date>(new Date());

  const handleDaySelect = (dayIndex: number, newDate: Date) => {
    setSelectedDay(days[dayIndex]);
    setDate(newDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.daySelectorContainer}>
        <DaySelector selectedDay={selectedDay} onDaySelect={handleDaySelect} />
      </View>
      <TimeList selectedDate={date} />
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
