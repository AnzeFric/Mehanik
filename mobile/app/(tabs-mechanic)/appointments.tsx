import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import DisplayItems from "@/components/mechanic/DisplayItems";
import Appointment from "@/components/mechanic/items/Appointment";
import { AppStyles } from "@/constants/Styles";
import { AppointmentData } from "@/interfaces/mechanic";

const fakeAppointments: AppointmentData[] = [
  {
    id: 0,
    name: "Marko Petrović",
    vehicle: "Volkswagen Golf 7",
    date: new Date(2024, 3, 1),
    description:
      "Avto dela zanimive zvoke v mašini. To je nek daljsi zapis, da lahko vidim kaj se zgodi, ko se bo besedilo pričelo sekat.",
  },
  {
    id: 1,
    name: "Ivana Jovanović",
    vehicle: "Audi A4",
    date: new Date(2024, 3, 3),
    description: "Potrebujem redni servis",
  },
  {
    id: 2,
    name: "Nemanja Nikolić",
    vehicle: "BMW X5",
    date: new Date(2024, 3, 7),
    description: "Hladilna tekočina mi toči",
  },
  {
    id: 3,
    name: "Ana Simić",
    vehicle: "Mercedes-Benz C200",
    date: new Date(2022, 11, 10),
    description: "Menjava gum",
  },
];

// TODO: Get items from database
export default function AppointmentsScreen() {
  const [appointmentList, setAppointmentList] =
    useState<Array<AppointmentData>>(fakeAppointments);

  return (
    <View style={styles.container}>
      <Text style={[AppStyles.bigTitle, styles.title]}>Novi termini</Text>
      <DisplayItems
        list={appointmentList}
        renderItem={(appointment, index) => (
          <Appointment appointmentData={appointment} key={index} />
        )}
        emptyMessage="Nimate novih terminov."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  title: {
    paddingHorizontal: 25,
  },
});
