import { View, StyleSheet } from "react-native";
import { useState, useEffect, useCallback } from "react";
import DisplayItems from "@/components/global/DisplayItems";
import Customer from "@/components/mechanic/items/Customer";
import { router, useFocusEffect } from "expo-router";
import PlusButton from "@/components/global/PlusButton";
import TitleRow from "@/components/shared/TitleRow";
import { useCustomer } from "@/hooks/useCustomer";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedSearchInput from "@/components/global/themed/ThemedSearchInput";

export default function LibraryScreen() {
  const [search, setSearch] = useState<string>("");
  const { customers, updateStoredCustomerData } = useCustomer();

  const filteredCustomers =
    search.trim() === ""
      ? customers
      : customers.filter(
          (customer) =>
            customer.customer.firstName
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            customer.customer.lastName
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            customer.vehicle.brand
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            customer.vehicle.model
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            customer.vehicle.vin.toLowerCase().includes(search.toLowerCase())
        );

  useEffect(() => {
    updateStoredCustomerData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearch("");
      };
    }, [])
  );

  return (
    <ThemedView type={"background"} style={styles.container}>
      <View style={styles.header}>
        <TitleRow title={"Knjižnica servisov"} hasBackButton={false} />
        <ThemedSearchInput viewStyle={{ marginHorizontal: 25 }} />
      </View>
      <DisplayItems
        list={filteredCustomers}
        renderItem={(customer, index) => (
          <Customer customerData={customer} setSearch={setSearch} key={index} />
        )}
        emptyMessage="Stranke ne obstajajo."
      />
      <PlusButton
        onPress={() => {
          router.push("/library/customer/add");
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 10,
    gap: 15,
  },
});
