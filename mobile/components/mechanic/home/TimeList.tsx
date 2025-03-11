import { View, ScrollView, StyleSheet } from "react-native";
import { useEffect, useMemo, useState } from "react";
import TimeItem from "./items/TimeItem";
import { Status } from "@/interfaces/user";
import { formatDate } from "@/constants/util";

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

interface Appointment {
  customerFirstName: string;
  customerLastName: string;
  dateTime: Date;
  status: Status;
  description: string;
}

// Get data from db. All the appointments from the same mechanic id
// Data has to be sorted by date and hour, ascending. 10.3.2025, 9:00 => 10.3.2025, 10:00 => 11.3.2025, 13:00, ...
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

export interface GroupedAppointmentData {
  customerFirstName: string;
  customerLastName: string;
  startDateTime: Date;
  endDateTime: Date;
  status: Status;
  description: string;
}

interface TimeListProps {
  selectedDay: string;
}

// TODO: make a hook
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
      };
    } else {
      // Extend the current group end time
      currentGroup.endDateTime = new Date(
        appointment.dateTime.getTime() + 60 * 60 * 1000
      );
    }
  });

  if (currentGroup) {
    groupedArr.push(currentGroup);
  }

  return groupedArr;
}

export default function TimeList({ selectedDay }: TimeListProps) {
  const [appointmentArr, setAppointmentArr] =
    useState<Array<Appointment>>(fakeAppointments);

  const groupedArr = useMemo(() => {
    const array = groupAppointments(appointmentArr);
    return array;
  }, [appointmentArr]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {groupedArr.map((appointment, index) => (
          <TimeItem appointment={appointment} key={index} />
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
