import { View, TextInput, StyleSheet } from "react-native";
import { useState, useCallback, useRef } from "react";
import DisplayItems from "@/components/global/DisplayItems";
import Customer from "@/components/mechanic/items/Customer";
import { AppStyles } from "@/constants/Styles";
import { router, useFocusEffect } from "expo-router";
import { CustomerData } from "@/interfaces/mechanic";
import PlusButton from "@/components/global/PlusButton";
import TitleRow from "@/components/shared/TitleRow";
import { Ionicons } from "@expo/vector-icons";

const fakeCustomers: CustomerData[] = [
  {
    id: 0,
    name: "Anže Fric",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    vehicle: "BMW 320i",
    year: 2020,
    vin: "WBAAL31029PZ12345",
  },
  {
    id: 1,
    name: "Dana Fric",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    vehicle: "Audi A4",
    year: 2019,
    vin: "WAUZZZ8K9LA123456",
  },
  {
    id: 2,
    name: "Saguaro Miyazaki",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    vehicle: "Toyota Camry",
    year: 2018,
    vin: "4T1BF1FK5GU654321",
  },
  {
    id: 3,
    name: "Ime Priimek",
    image: "",
    vehicle: "Mercedes C300",
    year: 2021,
    vin: "WDDWF4KB2LR987654",
  },
  {
    id: 4,
    name: "Mitja Pavlekovič",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    vehicle: "Tesla Model 3",
    year: 2022,
    vin: "5YJ3E1EA8MF765432",
  },
];

/* TODO: Get items from database*/

export default function LibraryScreen() {
  const [customerList, setCustomerList] =
    useState<Array<CustomerData>>(fakeCustomers);
  const [search, setSearch] = useState<string>("");

  const inputRef = useRef<TextInput>(null);

  const filteredCustomers =
    search.trim() === ""
      ? customerList
      : customerList.filter(
          (customer) =>
            customer.name.toLowerCase().includes(search.toLowerCase()) ||
            customer.vehicle.toLowerCase().includes(search.toLowerCase()) ||
            customer.vin.toLowerCase().includes(search.toLowerCase())
        );

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
