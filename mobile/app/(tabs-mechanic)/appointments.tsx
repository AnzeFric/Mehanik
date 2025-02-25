import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { AppStyles } from "@/constants/Styles";
import Customers from "@/components/mechanic/appointments/Customers";

export interface CustomerData {
  name: string;
  vehicle: string;
  day: Date;
}

const fakeCustomers: CustomerData[] = [
  {
    name: "Marko Petrović",
    vehicle: "Volkswagen Golf 7",
    day: new Date("2024-03-01"),
  },
  { name: "Ivana Jovanović", vehicle: "Audi A4", day: new Date("2024-03-03") },
  { name: "Nemanja Nikolić", vehicle: "BMW X5", day: new Date("2024-03-07") },
  {
    name: "Ana Simić",
    vehicle: "Mercedes-Benz C200",
    day: new Date("2024-03-10"),
  },
];

export default function AppointmentsScreen() {
  const [customerList, setCustomerList] =
    useState<Array<CustomerData>>(fakeCustomers);

  return (
    <View style={AppStyles.parentPadding}>
      <Text style={styles.title}>Novi termini</Text>
      <Customers customerList={customerList} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily: "Jaldi-Regular",
  },
});
