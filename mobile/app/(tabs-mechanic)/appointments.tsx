import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { AppStyles } from "@/constants/Styles";
import Customers from "@/components/mechanic/appointments/Customers";

export interface CustomerData {
  name: string;
  vehicle: string;
  day: Date;
}

export default function AppointmentsScreen() {
  const [customerList, setCustomerList] = useState<Array<CustomerData>>([]);

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
