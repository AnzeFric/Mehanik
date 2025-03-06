import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import { AppStyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import BackIcon from "@/assets/icons/BackIcon.svg";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useRef } from "react";
import { MechanicData } from "@/interfaces/user";

const fakeMechanicData: MechanicData = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  address: "123 Main St",
  city: "New York",
  image: "john_doe.jpg",
  email: "john.doe@example.com",
  phoneNumber: "123-456-7890",
  smallServicePrice: [
    { name: "Audi", price: 100 },
    { name: "BMW", price: 120 },
    { name: "Mercedes Benz", price: 130 },
  ],
  largeServicePrice: [
    { name: "Audi", price: 200 },
    { name: "BMW", price: 250 },
    { name: "Mercedes Benz", price: 270 },
  ],
  tireChangePrice: [
    { name: "Ford", price: 50 },
    { name: "Volkswagen", price: 55 },
  ],
};

export default function MechanicScreen() {
  const { id } = useLocalSearchParams();
  const [mechanicData, setMechanicData] =
    useState<MechanicData>(fakeMechanicData);
  const scrollRef = useRef<ScrollView>(null);

  // Make ScrollView return to top after screen is unfocused
  useFocusEffect(
    useCallback(() => {
      return () => {
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ y: 0 });
          }
        }, 100); // For smooth transition between screens
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackIcon
          height={30}
          width={30}
          style={{ alignSelf: "flex-start" }}
          onPress={() => {
            router.back();
          }}
        />
        <Text style={styles.userName}>
          {mechanicData?.firstName} {mechanicData?.lastName}
        </Text>
      </View>
      <ScrollView style={styles.childrenContainer} ref={scrollRef}>
        <Image
          source={require("@/assets/images/logo-main.png")}
          style={styles.image}
        />
        <Text>Lokacija: {mechanicData.address}</Text>
        <Text>Mesto/kraj: {mechanicData.city}</Text>
        <Text>Telefon: {mechanicData.phoneNumber}</Text>
        <Text>Email: {mechanicData.email}</Text>
        <Text>Cene</Text>
        <Text>Številke so okvirne in se razlikujejo med modeli</Text>
        <View>
          <Text>Mali servis:</Text>
          {mechanicData.smallServicePrice &&
            mechanicData.smallServicePrice?.map((brand, index) => (
              <Text key={index}>
                {brand.name}: {brand.price}
              </Text>
            ))}
        </View>
        <View>
          <Text>Veliki servis:</Text>
          {mechanicData.largeServicePrice &&
            mechanicData.largeServicePrice.map((brand, index) => (
              <Text key={index}>
                {brand.name}: {brand.price}
              </Text>
            ))}
        </View>
        <View>
          <Text>Menjava gum:</Text>
          {mechanicData.tireChangePrice &&
            mechanicData.tireChangePrice.map((brand, index) => (
              <Text key={index}>
                {brand.name}: {brand.price}
              </Text>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    borderBottomColor: Colors.light.inactiveBorder,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "dashed",
    paddingTop: 20,
    marginHorizontal: 25,
  },
  image: {
    width: "50%",
    height: 250,
    alignSelf: "center",
  },
  userName: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: "Jaldi-Regular",
    flex: 1,
    textAlign: "center",
  },
  childrenContainer: {
    flex: 1,
  },
  button: {
    paddingVertical: 0,
    marginHorizontal: 25,
    marginBottom: 25,
  },
  buttonText: {
    lineHeight: 40,
  },
});
