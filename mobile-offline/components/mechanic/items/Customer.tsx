import { View, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { CustomerFormData } from "@/interfaces/customer";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import { useState } from "react";
import ModalPrompt from "@/components/global/ModalPrompt";
import { useCustomers } from "@/hooks/useCustomers";
import useDataStore from "@/stores/useDataStore";
import { useTranslation } from "react-i18next";

interface Props {
  customer: CustomerFormData;
}

export default function Customer({ customer }: Props) {
  const { staticColors } = useAnimatedTheme();

  const { setCustomers } = useDataStore();

  const { t } = useTranslation();
  const { fetchCustomers, deleteCustomer } = useCustomers();

  const [showDelete, setShowDelete] = useState(false);

  const toCustomerDetails = () => {
    router.push({
      pathname: "/customer/detail",
      params: {
        customerUuid: customer.customer.uuid,
        firstName: customer.customer.firstName,
      },
    });
  };

  const handleDeleteCustomer = async () => {
    const success = await deleteCustomer(customer.customer.uuid);
    if (success) {
      const newCustomers = await fetchCustomers();
      if (newCustomers) setCustomers(newCustomers);
    } else {
      Alert.alert(
        t("components.mechanic.items.customerDeleteFailTitle"),
        t("components.mechanic.items.customerDeleteFailText")
      );
    }
    setShowDelete(false);
  };

  return (
    <ThemedView type={"secondary"}>
      <TouchableOpacity
        style={[
          styles.container,
          { borderLeftColor: staticColors.specialBlue },
        ]}
        activeOpacity={0.7}
        onPress={toCustomerDetails}
        onLongPress={() => {
          setShowDelete(true);
        }}
      >
        {customer.vehicle.image ? (
          <Image
            source={{ uri: customer.vehicle.image }}
            style={styles.image}
          />
        ) : (
          <Image
            source={require("@/assets/logo-main.png")}
            style={styles.image}
          />
        )}
        <View style={{ flex: 1 }}>
          <ThemedText type={"small"} bold>
            {customer.customer.firstName} {customer.customer.lastName}
          </ThemedText>
          <ThemedText type={"extraSmall"}>
            {customer.vehicle.brand} {customer.vehicle.model}
            {customer.vehicle.buildYear && (
              <>
                {", "}
                {customer.vehicle.buildYear}
              </>
            )}
          </ThemedText>
          <ThemedText type={"extraSmall"}>{customer.vehicle.vin}</ThemedText>
        </View>
      </TouchableOpacity>

      {showDelete && (
        <ModalPrompt
          isVisible={true}
          message={t("components.mechanic.items.customerModalDeleteMessage")}
          onConfirm={handleDeleteCustomer}
          onCancel={() => {
            setShowDelete(false);
          }}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    borderLeftWidth: 6,
    alignItems: "center",
    gap: 15,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 6,
  },
});
