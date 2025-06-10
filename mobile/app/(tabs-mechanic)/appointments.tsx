import { StyleSheet } from "react-native";
import { useState } from "react";
import DisplayItems from "@/components/global/DisplayItems";
import Appointment from "@/components/mechanic/items/Appointment";
import { AppointmentData } from "@/interfaces/appointment";
import TitleRow from "@/components/shared/TitleRow";
import ThemedView from "@/components/global/themed/ThemedView";

const fakeAppointments: AppointmentData[] = [
  {
    id: 0,
    name: "Marko Petrović",
    vehicle: "Volkswagen Golf 7",
    dateTime: new Date(2024, 3, 1, 12, 0, 0),
    description:
      "Avto dela zanimive zvoke v mašini. To je nek daljsi zapis, da lahko vidim kaj se zgodi, ko se bo besedilo pričelo sekat.",
  },
  {
    id: 1,
    name: "Ivana Jovanović",
    vehicle: "Audi A4",
    dateTime: new Date(2024, 3, 3, 11, 0, 0),
    description: "Potrebujem redni servis",
  },
  {
    id: 2,
    name: "Nemanja Nikolić",
    vehicle: "BMW X5",
    dateTime: new Date(2024, 3, 7, 9, 15, 0),
    description: "Hladilna tekočina mi toči",
  },
  {
    id: 3,
    name: "Ana Simić",
    vehicle: "Mercedes-Benz C200",
    dateTime: new Date(2022, 11, 10, 16, 20),
    description: "Menjava gum",
  },
];

// TODO: Get items from database
export default function AppointmentsScreen() {
  const [appointmentList, setAppointmentList] =
    useState<Array<AppointmentData>>(fakeAppointments);

  return (
    <ThemedView style={styles.container}>
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
