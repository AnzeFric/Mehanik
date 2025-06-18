import { View, StyleSheet } from "react-native";
import { useState } from "react";
import DaySelector from "./DaySelector";
import TimeList from "./TimeList";
import { UserAppointmentData } from "@/interfaces/appointment";

interface Props {
  appointments: Array<UserAppointmentData>;
  mechanicEmail?: string;
}

export default function DaySchedule({ appointments, mechanicEmail }: Props) {
  const days = ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"];

  const [selectedDay, setSelectedDay] = useState<string>(days[0]);
  const [date, setDate] = useState<Date>(new Date());

  const handleDaySelect = (dayIndex: number, newDate: Date) => {
    setSelectedDay(days[dayIndex]);
    setDate(newDate);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 15 }}>
        <DaySelector selectedDay={selectedDay} onDaySelect={handleDaySelect} />
      </View>
      <TimeList
        appointments={appointments}
        selectedDate={date}
        mechanicEmail={mechanicEmail}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    flex: 1,
  },
});
