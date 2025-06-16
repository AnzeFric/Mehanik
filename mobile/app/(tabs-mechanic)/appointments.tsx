import { StyleSheet } from "react-native";
import { useState } from "react";
import DisplayItems from "@/components/global/DisplayItems";
import Appointment from "@/components/mechanic/items/Appointment";
import TitleRow from "@/components/shared/TitleRow";
import ThemedView from "@/components/global/themed/ThemedView";
import { UserAppointmentData } from "@/interfaces/appointment";

const fakeAppointments: UserAppointmentData[] = [
  {
    uuid: "asdasd",
    startDate: new Date(2025, 6, 16, 12, 0, 0),
    endDate: new Date(2025, 6, 16, 14, 0, 0),
    status: "accepted",
    userMessage: "Mali servis",
    user: {
      firstName: "Anze",
      lastName: "Fric",
      email: "anze.fric@gmail.com",
    },
    vehicle: {
      brand: "Skoda",
      model: "Octavia",
      buildYear: 2014,
    },
  },
];

// TODO: Get items from database
export default function AppointmentsScreen() {
  const [appointmentList, setAppointmentList] =
    useState<Array<UserAppointmentData>>(fakeAppointments);

  return (
    <ThemedView type={"background"} style={styles.container}>
      <TitleRow title={"Novi termini"} hasBackButton={false} />
      <DisplayItems
        list={appointmentList}
        renderItem={(appointment, index) => (
          <Appointment appointmentData={appointment} key={index} />
        )}
        emptyMessage="Nimate novih terminov."
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
