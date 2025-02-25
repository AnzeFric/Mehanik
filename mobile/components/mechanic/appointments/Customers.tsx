import { View, Text, StyleSheet } from "react-native";
import { CustomerData } from "@/app/(tabs-mechanic)/appointments";
import Customer from "./items/Customer";

interface Props {
  customerList: CustomerData[];
}

export default function Customers({ customerList }: Props) {
  return (
    <View style={styles.container}>
      {customerList.length > 0 ? (
        customerList.map((customer, index) => (
          <Customer customerData={customer} key={index} />
        ))
      ) : (
        <Text style={styles.text}>Nimate novih terminov.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  text: {
    fontSize: 20,
    fontFamily: "Jaldi-Regular",
    textAlign: "center",
  },
});
