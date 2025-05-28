import { View, ScrollView, StyleSheet, Text } from "react-native";
import { useMemo, useState } from "react";
import TimeItem from "./items/TimeItem";
import { useAppointment } from "@/hooks/useAppointment";
import { Appointment } from "@/interfaces/appointment";

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

const fakeAppointments: Appointment[] = [
  {
    customerFirstName: "Anze",
    customerLastName: "Fric",
    dateTime: new Date("2025-05-28T09:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Anze",
    customerLastName: "Fric",
    dateTime: new Date("2025-05-28T10:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Anze",
    customerLastName: "Fric",
    dateTime: new Date("2025-05-28T11:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Dana",
    customerLastName: "Fric",
    dateTime: new Date("2025-05-28T12:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Dana",
    customerLastName: "Fric",
    dateTime: new Date("2025-05-28T13:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Dana",
    customerLastName: "Fric",
    dateTime: new Date("2025-05-28T14:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Dana",
    customerLastName: "Fric",
    dateTime: new Date("2025-05-28T16:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Ziga",
    customerLastName: "Fric",
    dateTime: new Date("2025-05-29T14:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Ziga",
    customerLastName: "Fric",
    dateTime: new Date("2025-05-29T15:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Anze",
    customerLastName: "Fric",
    dateTime: new Date("2025-05-29T10:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Anze",
    customerLastName: "Fric",
    dateTime: new Date("2025-05-29T09:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Anze",
    customerLastName: "Fric",
    dateTime: new Date("2025-05-29T13:00:00"),
    status: "Accepted",
    description: "",
  },
];

interface Props {
  selectedDate: Date;
}

export default function TimeList({ selectedDate }: Props) {
  const { groupAppointments, getAppointmentAtHour, isAppointmentStartHour } =
    useAppointment();
  const [appointments, setAppointments] =
    useState<Array<Appointment>>(fakeAppointments);

  const filteredAppointments = useMemo(() => {
    const targetDate = selectedDate.toISOString().split("T")[0];

    // Filter appointments for the selected day
    const filtered = appointments.filter((appointment) => {
      const appointmentDate = appointment.dateTime.toISOString().split("T")[0];
      return appointmentDate === targetDate;
    });

    return filtered;
  }, [appointments, selectedDate]);

  const groupedAppointments = useMemo(() => {
    const grouped = groupAppointments(filteredAppointments);
    return grouped;
  }, [filteredAppointments]);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            display: "flex",
            alignSelf: "flex-start",
          }}
        >
          {times.map((time, index) => (
            <View style={{ height: 80 }} key={index}>
              <Text style={styles.timeText}>{time}</Text>
            </View>
          ))}
        </View>
        <View style={styles.container}>
          {times.map((time, index) => {
            const hour = parseInt(time.split(":")[0]);
            const appointment = getAppointmentAtHour(groupedAppointments, hour);

            return (
              <View key={index} style={styles.timeRow}>
                <View style={styles.appointmentContainer}>
                  {appointment && isAppointmentStartHour(hour, appointment) ? (
                    <TimeItem appointment={appointment} />
                  ) : !appointment ? (
                    <View style={styles.emptySlot}>
                      <Text style={styles.emptyText}>Prazen termin</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  timeRow: {
    flexDirection: "row",
  },
  timeIndicator: {
    width: 60,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
  },
  appointmentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  emptySlot: {
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: 14,
  },
});
