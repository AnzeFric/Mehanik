import { View, StyleSheet } from "react-native";
import { useState, useCallback, useMemo, useEffect } from "react";
import DisplayItems from "@/components/global/DisplayItems";
import CustomerItem from "@/components/mechanic/items/Customer";
import { router, useFocusEffect } from "expo-router";
import PlusButton from "@/components/global/PlusButton";
import TitleRow from "@/components/global/TitleRow";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedSearchInput from "@/components/global/themed/ThemedSearchInput";
import { useCustomers } from "@/hooks/useCustomers";
import LoadingScreen from "@/components/global/LoadingScreen";
import useDataStore from "@/stores/useDataStore";

export default function HomeScreen() {
  const { customers, setCustomers } = useDataStore();
  const { fetchCustomers } = useCustomers();
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeCustomers = async () => {
      const customers = await fetchCustomers();
      if (customers) {
        setCustomers(customers);
      }
    };
    setLoading(true);
    initializeCustomers();
    setLoading(false);
  }, [customers]);

  const filteredData = useMemo(() => {
    if (search.trim() === "") return customers;

    return customers.filter((customer) => {
      const searchLower = search.toLowerCase();

      // Customer search
      const customerMatch =
        customer.customer.firstName?.toLowerCase().includes(searchLower) ||
        customer.customer.lastName?.toLowerCase().includes(searchLower) ||
        customer.customer.email?.toLowerCase().includes(searchLower) ||
        customer.customer.phone?.toLowerCase().includes(searchLower);

      // Vehicle search
      const vehicleMatch =
        customer.vehicle.brand?.toLowerCase().includes(searchLower) ||
        customer.vehicle.model?.toLowerCase().includes(searchLower) ||
        customer.vehicle.vin?.toLowerCase().includes(searchLower) ||
        customer.vehicle.buildYear?.toString().includes(searchLower);

      return customerMatch || vehicleMatch;
    });
  }, [search, customers]);

  useFocusEffect(
    useCallback(() => {
      fetchCustomers();
      return () => {
        setSearch("");
      };
    }, [])
  );

  if (loading) {
    return <LoadingScreen type={"full"} text={"Nalaganje podatkov..."} />;
  }

  return (
    <ThemedView type={"background"} style={{ flex: 1 }}>
      <View style={styles.header}>
        <TitleRow title={"Knjižnica servisov"} hasBackButton={false} />
        <ThemedSearchInput value={search} onChangeText={setSearch} />
      </View>
      <DisplayItems
        list={filteredData}
        renderItem={(customer, index) => (
          <CustomerItem customer={customer} key={index} />
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
    paddingVertical: 25,
    paddingHorizontal: 20,
    gap: 20,
  },
});
