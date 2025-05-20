import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState, useCallback } from "react";
import DisplayItems from "@/components/global-help/DisplayItems";
import Customer from "@/components/mechanic/items/Customer";
import SearchIcon from "@/assets/icons/SearchIcon.svg";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";
import { router, useFocusEffect } from "expo-router";
import { CustomerData } from "@/interfaces/mechanic";
import PlusButton from "@/components/global-ui/PlusButton";

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
        <Text style={AppStyles.bigTitle}>Knjižnica servisov</Text>
        <View style={styles.textInputContainer}>
          <SearchIcon color={Colors.light.primaryText} height={20} width={20} />
          <TextInput
            style={[AppStyles.text, styles.textInput]}
            placeholder="Išči"
            value={search}
            onChangeText={(text: string) => {
              setSearch(text);
            }}
            numberOfLines={1}
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
    paddingTop: 20,
    flex: 1,
  },
  header: {
    paddingHorizontal: 25,
    paddingBottom: 10,
    gap: 15,
  },
  textInputContainer: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.light.textInputBorder,
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 10,
  },
  textInput: {
    height: 50,
    width: "100%",
  },
});
