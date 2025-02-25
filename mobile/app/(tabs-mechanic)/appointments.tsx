import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { AppStyles } from "@/constants/Styles";
import Customers from "@/components/mechanic/appointments/Customers";

export interface CustomerData {
  name: string;
  vehicle: string;
  day: Date;
  description: string;
}

const fakeCustomers: CustomerData[] = [
  {
    name: "Marko Petrović",
    vehicle: "Volkswagen Golf 7",
    day: new Date("2024-03-01"),
    description:
      "Avto dela zanimive zvoke v mašini. To je nek daljsi zapis, da lahko vidim kaj se zgodi, ko se bo besedilo pričelo sekat.",
  },
  {
    name: "Ivana Jovanović",
    vehicle: "Audi A4",
    day: new Date("2024-03-03"),
    description: "Potrebujem redni servis",
  },
  {
    name: "Nemanja Nikolić",
    vehicle: "BMW X5",
    day: new Date("2024-03-07"),
    description: "Hladilna tekočina mi toči",
  },
  {
    name: "Ana Simić",
    vehicle: "Mercedes-Benz C200",
    day: new Date("2024-03-10"),
    description: "Menjava gum",
  },
];

export default function AppointmentsScreen() {
  const [customerList, setCustomerList] =
    useState<Array<CustomerData>>(fakeCustomers);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novi termini</Text>
      <Customers customerList={customerList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: "Jaldi-Regular",
    paddingHorizontal: 25,
  },
});
