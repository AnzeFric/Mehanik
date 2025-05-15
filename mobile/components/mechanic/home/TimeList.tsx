import { View, ScrollView, StyleSheet, Text } from "react-native";
import { useEffect, useMemo, useState } from "react";
import TimeItem from "./items/TimeItem";
import { Status } from "@/interfaces/user";
import { formatDate } from "@/constants/util";
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

const fakeAppointments: Appointment[] = [
  {
    customerFirstName: "Anze",
    customerLastName: "Fric",
    dateTime: new Date("2025-03-10T09:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Anze",
    customerLastName: "Fric",
    dateTime: new Date("2025-03-10T10:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Anze",
    customerLastName: "Fric",
    dateTime: new Date("2025-03-10T11:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Dana",
    customerLastName: "Fric",
    dateTime: new Date("2025-03-10T12:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Dana",
    customerLastName: "Fric",
    dateTime: new Date("2025-03-10T13:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Dana",
    customerLastName: "Fric",
    dateTime: new Date("2025-03-10T14:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Dana",
    customerLastName: "Fric",
    dateTime: new Date("2025-03-10T16:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Ziga",
    customerLastName: "Fric",
    dateTime: new Date("2025-03-10T14:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Ziga",
    customerLastName: "Fric",
    dateTime: new Date("2025-03-10T15:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Anze",
    customerLastName: "Fric",
    dateTime: new Date("2025-03-11T10:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Anze",
    customerLastName: "Fric",
    dateTime: new Date("2025-03-12T09:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Anze",
    customerLastName: "Fric",
    dateTime: new Date("2025-03-12T10:00:00"),
    status: "Accepted",
    description: "",
  },
  {
    customerFirstName: "Anze",
    customerLastName: "Fric",
    dateTime: new Date("2025-03-10T11:00:00"),
    status: "Accepted",
    description: "",
  },
];

interface Appointment {
  customerFirstName: string;
  customerLastName: string;
  dateTime: Date;
  status: Status;
  description: string;
}

export interface GroupedAppointmentData {
  customerFirstName: string;
  customerLastName: string;
  startDateTime: Date;
  endDateTime: Date;
  status: Status;
  description: string;
  numAppointments: number;
}

interface TimeListProps {
  selectedDay: string;
}

function groupAppointments(
  appointments: Appointment[]
): GroupedAppointmentData[] {
  const groupedArr: GroupedAppointmentData[] = [];
  let currentGroup: GroupedAppointmentData | null = null;

  appointments.forEach((appointment) => {
    // Format date for comparison (YYYY-MM-DD)
    const appointmentDate = appointment.dateTime.toISOString().split("T")[0];
    const currentGroupDate = currentGroup?.startDateTime
      .toISOString()
      .split("T")[0];

    // No current group || appointment does not match the current group's customer or date
    if (
      !currentGroup ||
      currentGroup.customerFirstName !== appointment.customerFirstName ||
      currentGroup.customerLastName !== appointment.customerLastName ||
      appointmentDate !== currentGroupDate ||
      // Appointments are not consecutive (more than one hour apart)
      appointment.dateTime.getTime() -
        new Date(currentGroup.endDateTime).getTime() >
        0
    ) {
      // Start a new group
      if (currentGroup) {
        groupedArr.push(currentGroup);
      }

      currentGroup = {
        customerFirstName: appointment.customerFirstName,
        customerLastName: appointment.customerLastName,
        startDateTime: appointment.dateTime,
        endDateTime: new Date(appointment.dateTime.getTime() + 60 * 60 * 1000), // Add 1 hour
        status: appointment.status,
        description: appointment.description,
        numAppointments: 1,
      };
    } else {
      // Extend the current group end time
      currentGroup.endDateTime = new Date(
        appointment.dateTime.getTime() + 60 * 60 * 1000
      );
      // Increment the appointment count
      currentGroup.numAppointments += 1;
    }
  });

  if (currentGroup) {
    groupedArr.push(currentGroup);
  }

  return groupedArr;
}

export default function TimeList({ selectedDay }: TimeListProps) {
  const [appointments, setAppointments] =
    useState<Array<Appointment>>(fakeAppointments);

  const filteredAppointments = useMemo(() => {
    // Filter appointments for the selected day
    const today = new Date();
    const dayNameToNumber: { [key: string]: number } = {
      Pon: 1,
      Tor: 2,
      Sre: 3,
      Čet: 4,
      Pet: 5,
      Sob: 6,
      Ned: 0,
    };

    return appointments.filter((appointment) => {
      const appointmentDay = appointment.dateTime.getDay();
      return appointmentDay === dayNameToNumber[selectedDay];
    });
  }, [appointments, selectedDay]);

  const groupedAppointments = useMemo(() => {
    return groupAppointments(filteredAppointments);
  }, [filteredAppointments]);

  // Function to check if an appointment exists at a specific hour
  const getAppointmentAtHour = (hour: number) => {
    return groupedAppointments.find((app) => {
      const startHour = app.startDateTime.getHours();
      const endHour = app.endDateTime.getHours();
      return hour >= startHour && hour < endHour;
    });
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View
          style={{
            backgroundColor: "red",
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
            const appointment = getAppointmentAtHour(hour);

            return (
              <View key={index} style={styles.timeRow}>
                <View style={styles.appointmentContainer}>
                  {appointment &&
                  appointment.startDateTime.getHours() === hour ? (
                    <TimeItem appointment={appointment} />
                  ) : (
                    !getAppointmentAtHour(hour) && (
                      <View style={styles.emptySlot}>
                        <Text style={styles.emptyText}>Prazen termin</Text>
                      </View>
                    )
                  )}
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
    backgroundColor: "blue",
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
