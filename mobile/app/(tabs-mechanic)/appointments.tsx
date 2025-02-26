import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import DisplayItems from "@/components/mechanic/DisplayItems";
import Customer, { CustomerData } from "@/components/mechanic/items/Customer";
import { AppStyles } from "@/constants/Styles";

const fakeCustomers: CustomerData[] = [
  {
    id: 0,
    name: "Marko Petrović",
    vehicle: "Volkswagen Golf 7",
    day: new Date("2024-03-01"),
    description:
      "Avto dela zanimive zvoke v mašini. To je nek daljsi zapis, da lahko vidim kaj se zgodi, ko se bo besedilo pričelo sekat.",
  },
  {
    id: 1,
    name: "Ivana Jovanović",
    vehicle: "Audi A4",
    day: new Date("2024-03-03"),
    description: "Potrebujem redni servis",
  },
  {
    id: 2,
    name: "Nemanja Nikolić",
    vehicle: "BMW X5",
    day: new Date("2024-03-07"),
    description: "Hladilna tekočina mi toči",
  },
  {
    id: 3,
    name: "Ana Simić",
    vehicle: "Mercedes-Benz C200",
    day: new Date("2024-03-10"),
    description: "Menjava gum",
  },
];

// TODO: Get items from database
export default function AppointmentsScreen() {
  const [customerList, setCustomerList] =
    useState<Array<CustomerData>>(fakeCustomers);

  return (
    <View style={styles.container}>
      <Text style={[AppStyles.bigTitle, styles.title]}>Novi termini</Text>
      <DisplayItems
        list={customerList}
        renderItem={(customer, index) => (
          <Customer customerData={customer} key={index} />
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
