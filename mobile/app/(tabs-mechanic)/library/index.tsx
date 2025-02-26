import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import DisplayItems from "@/components/mechanic/DisplayItems";
import Service, { ServiceData } from "@/components/mechanic/items/Service";
import SearchIcon from "@/assets/icons/SearchIcon.svg";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";

const fakeServices: ServiceData[] = [
  {
    id: 0,
    name: "Anže Fric",
    image: "https://source.unsplash.com/200x200/?car,oil",
    vehicle: "BMW 320i 2020",
    vin: "WBAAL31029PZ12345",
  },
  {
    id: 1,
    name: "Dana Fric",
    image: "https://source.unsplash.com/200x200/?car,brake",
    vehicle: "Audi A4 2019",
    vin: "WAUZZZ8K9LA123456",
  },
  {
    id: 2,
    name: "Saguaro Miyazaki",
    image: "https://source.unsplash.com/200x200/?car,tire",
    vehicle: "Toyota Camry 2018",
    vin: "4T1BF1FK5GU654321",
  },
  {
    id: 3,
    name: "Ime Priimek",
    image: "https://source.unsplash.com/200x200/?car,engine",
    vehicle: "Mercedes C300 2021",
    vin: "WDDWF4KB2LR987654",
  },
  {
    id: 4,
    name: "Mitja Pavlekovič",
    image: "https://source.unsplash.com/200x200/?car,ac",
    vehicle: "Tesla Model 3 2022",
    vin: "5YJ3E1EA8MF765432",
  },
];

/* TODO: Get items from database
          Make search bar work and filter items based on input*/
export default function LibraryScreen() {
  const [serviceList, setServiceList] =
    useState<Array<ServiceData>>(fakeServices);
  const [search, setSearch] = useState<string>("");

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
            onChangeText={setSearch}
            numberOfLines={1}
          />
        </View>
      </View>
      <DisplayItems
        list={serviceList}
        renderItem={(service, index) => (
          <Service serviceData={service} key={index} />
        )}
        emptyMessage="Nimate vpisanih servisov."
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
    width: "100%",
    lineHeight: 32,
  },
});
