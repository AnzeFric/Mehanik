import { View, StyleSheet } from "react-native";
import { CustomerData } from "@/interfaces/customer";
import ThemedText from "@/components/global/themed/ThemedText";

interface Props {
  customer: CustomerData;
}

export default function CustomerDisplay({ customer }: Props) {
  return (
    <View style={styles.container}>
      <ThemedText type={"title"}>Podatki o stranki</ThemedText>
      <View>
        <ThemedText type={"small"}>
          {customer.firstName} {customer.lastName}
        </ThemedText>
        {customer.email && (
          <ThemedText type={"small"}>{customer.email}</ThemedText>
        )}
        {customer.phone && (
          <ThemedText type={"small"}>{customer.phone}</ThemedText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
});
