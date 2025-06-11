import { View, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";
import { CustomerData } from "@/interfaces/customer";
import ThemedText from "@/components/global/themed/ThemedText";

interface Props {
  customer: CustomerData;
}

export default function CustomerDisplay({ customer }: Props) {
  return (
    <View style={styles.container}>
      <ThemedText style={AppStyles.title}>Podatki o stranki</ThemedText>
      <View>
        <ThemedText style={AppStyles.smallText}>
          {customer.firstName} {customer.lastName}
        </ThemedText>
        {customer.email && (
          <ThemedText style={AppStyles.smallText}>{customer.email}</ThemedText>
        )}
        {customer.phone && (
          <ThemedText style={AppStyles.text}>{customer.phone}</ThemedText>
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
