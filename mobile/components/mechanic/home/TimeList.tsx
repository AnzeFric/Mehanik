import { View, ScrollView, StyleSheet } from "react-native";
import { useMemo } from "react";
import { UserAppointmentData } from "@/interfaces/appointment";
import ThemedText from "@/components/global/themed/ThemedText";
import TimeContainer from "./items/TimeContainer";

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

// Defines the height that elements in list will have
const itemHeight = 100;

interface Props {
  appointments: Array<UserAppointmentData>;
  selectedDate: Date;
  mechanicEmail?: string;
}

export default function TimeList({
  appointments,
  selectedDate,
  mechanicEmail,
}: Props) {
  const groupedAppointments = useMemo(() => {
    const targetDate = selectedDate.toISOString().split("T")[0];

    // Filter appointments for the selected day
    const filtered = appointments.filter((appointment) => {
      const appointmentDate = appointment.startDate.toISOString().split("T")[0];
      return appointmentDate === targetDate;
    });

    return filtered;
  }, [appointments, selectedDate]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <View>
          {times.map((time, index) => (
            <View style={styles.hourItem} key={index}>
              <ThemedText type={"small"}>{time}</ThemedText>
            </View>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          {times.map((time, index) => (
            <TimeContainer
              itemHeight={itemHeight}
              time={time}
              date={selectedDate}
              mechanicEmail={mechanicEmail}
              groupedAppointments={groupedAppointments}
              key={index}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hourItem: {
    height: itemHeight,
    paddingHorizontal: 10,
  },
});
