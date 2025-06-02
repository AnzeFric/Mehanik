import { Text, View, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";
import { CustomerData } from "@/interfaces/customer";

interface Props {
  customer: CustomerData;
}

export default function CustomerDisplay({ customer }: Props) {
  return (
    <View style={styles.container}>
      <Text style={AppStyles.title}>Podatki o stranki</Text>
      <View>
        <Text style={AppStyles.text}>{customer.email}</Text>
        <Text style={AppStyles.text}>
          {customer.firstName} {customer.lastName}
        </Text>
        {customer.phone && <Text style={AppStyles.text}>{customer.phone}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  image: {
    width: "100%",
    height: 250,
  },
});
