import { View, TextInput, StyleSheet } from "react-native";
import { useState, useEffect, useCallback, useRef } from "react";
import DisplayItems from "@/components/global/DisplayItems";
import Customer from "@/components/mechanic/items/Customer";
import { AppStyles } from "@/constants/Styles";
import { router, useFocusEffect } from "expo-router";
import PlusButton from "@/components/global/PlusButton";
import TitleRow from "@/components/shared/TitleRow";
import { Ionicons } from "@expo/vector-icons";
import { useCustomer } from "@/hooks/useCustomer";

export default function LibraryScreen() {
  const [search, setSearch] = useState<string>("");
  const { customers, updateStoredCustomerData } = useCustomer();

  const inputRef = useRef<TextInput>(null);

  const filteredCustomers =
    search.trim() === ""
      ? customers
      : customers.filter(
          (customer) =>
            customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
            customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
            customer.brand.toLowerCase().includes(search.toLowerCase()) ||
            customer.model.toLowerCase().includes(search.toLowerCase()) ||
            customer.vin.toLowerCase().includes(search.toLowerCase())
        );

  useEffect(() => {
    updateStoredCustomerData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setTimeout(() => {
          setSearch("");
        }, 100); // For smooth transition between screens
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TitleRow title={"Knjižnica servisov"} hasBackButton={false} />
        <View style={[AppStyles.inputContainer, { marginHorizontal: 25 }]}>
          <TextInput
            style={AppStyles.input}
            placeholder={"Iskanje"}
            value={search}
            onChangeText={setSearch}
            ref={inputRef}
          />
          <Ionicons
            name={"search-outline"}
            size={20}
            color={"#888"}
            onPress={() => inputRef.current?.focus()}
          />
        </View>
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
          router.push("/library/add-customer");
        }}
      />
    </View>
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
