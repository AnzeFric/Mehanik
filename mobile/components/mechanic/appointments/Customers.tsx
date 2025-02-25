import { View, Text, StyleSheet, ScrollView } from "react-native";
import { CustomerData } from "@/app/(tabs-mechanic)/appointments";
import Customer from "./items/Customer";

interface Props {
  customerList: CustomerData[];
}

export default function Customers({ customerList }: Props) {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {customerList.length > 0 ? (
          customerList.map((customer, index) => (
            <Customer customerData={customer} key={index} />
          ))
        ) : (
          <Text style={styles.text}>Nimate novih terminov.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 25,
    flex: 1,
  },
  container: {
    gap: 10,
    paddingVertical: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: "Jaldi-Regular",
    textAlign: "center",
  },
});
