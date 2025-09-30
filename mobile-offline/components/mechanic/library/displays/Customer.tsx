import { View, StyleSheet } from "react-native";
import { CustomerData } from "@/interfaces/customer";
import ThemedText from "@/components/global/themed/ThemedText";
import { useTranslation } from "react-i18next";

interface Props {
  customer: CustomerData;
}

export default function CustomerDisplay({ customer }: Props) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ThemedText type={"title"}>
        {t("components.mechanic.displays.customerTitle")}
      </ThemedText>
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
