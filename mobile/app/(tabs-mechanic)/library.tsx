import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import DisplayItems from "@/components/mechanic/DisplayItems";
import Service from "@/components/mechanic/items/Service";

export interface ServiceData {
  name: string;
  image: string;
  vehicle: string;
  vin: string;
}

const fakeServices: ServiceData[] = [
  {
    name: "Oil Change",
    image: "https://source.unsplash.com/200x200/?car,oil",
    vehicle: "BMW 320i 2020",
    vin: "WBAAL31029PZ12345",
  },
  {
    name: "Brake Service",
    image: "https://source.unsplash.com/200x200/?car,brake",
    vehicle: "Audi A4 2019",
    vin: "WAUZZZ8K9LA123456",
  },
  {
    name: "Tire Rotation",
    image: "https://source.unsplash.com/200x200/?car,tire",
    vehicle: "Toyota Camry 2018",
    vin: "4T1BF1FK5GU654321",
  },
  {
    name: "Engine Diagnostic",
    image: "https://source.unsplash.com/200x200/?car,engine",
    vehicle: "Mercedes C300 2021",
    vin: "WDDWF4KB2LR987654",
  },
  {
    name: "Air Conditioning Service",
    image: "https://source.unsplash.com/200x200/?car,ac",
    vehicle: "Tesla Model 3 2022",
    vin: "5YJ3E1EA8MF765432",
  },
];

// TODO: Get items from database
export default function LibraryScreen() {
  const [serviceList, setServiceList] =
    useState<Array<ServiceData>>(fakeServices);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Knjižnica servisov</Text>
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
  title: {
    fontSize: 32,
    fontFamily: "Jaldi-Regular",
    paddingHorizontal: 25,
  },
});
