import { View, StyleSheet } from "react-native";
import { useState, useCallback } from "react";
import DisplayItems from "@/components/global/DisplayItems";
import Customer from "@/components/mechanic/items/Customer";
import { router, useFocusEffect } from "expo-router";
import PlusButton from "@/components/global/PlusButton";
import TitleRow from "@/components/shared/TitleRow";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedSearchInput from "@/components/global/themed/ThemedSearchInput";
import useCustomerStore from "@/stores/accounts/useCustomerStore";

export default function LibraryScreen() {
  const { customers } = useCustomerStore();

  const [search, setSearch] = useState<string>("");

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

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearch("");
      };
    }, [])
  );

  return (
    <ThemedView type={"background"} style={{ flex: 1 }}>
      <View style={styles.header}>
        <TitleRow title={"Knjižnica servisov"} hasBackButton={false} />
        <ThemedSearchInput
          value={search}
          onChangeText={setSearch}
          viewStyle={{ marginHorizontal: 25 }}
        />
      </View>
      <DisplayItems
        list={filteredCustomers}
        renderItem={(customer, index) => (
          <Customer customerData={customer} key={index} />
        )}
        emptyMessage="Stranke ne obstajajo."
      />
      <PlusButton
        onPress={() => {
          router.push("/customer/add");
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    gap: 15,
  },
});
