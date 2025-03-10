import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useCallback, useRef } from "react";
import { AppStyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import BackIcon from "@/assets/icons/BackIcon.svg";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
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
  tireChangePrice: [],
};

export default function MechanicScreen() {
  const { id } = useLocalSearchParams();
  const [mechanicData] = useState<MechanicData>(fakeMechanicData);
  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ y: 0 });
          }
        }, 100);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <BackIcon height={24} width={24} />
        </TouchableOpacity>
        <Text style={AppStyles.bigTitle}>
          {mechanicData?.firstName} {mechanicData?.lastName}
        </Text>
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionContainer}>
          <Text style={AppStyles.title}>Lokacija</Text>
          <Text style={AppStyles.text}>
            {mechanicData.address}, {mechanicData.city}
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={AppStyles.title}>Kontakt</Text>
          <Text style={AppStyles.text}>{mechanicData.phoneNumber}</Text>
          <Text style={AppStyles.text}>{mechanicData.email}</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={AppStyles.title}>Cene</Text>
          <Text style={[AppStyles.text, styles.priceNote]}>
            Številke so okvirne in se razlikujejo med modeli
          </Text>

          <View style={styles.servicePriceSection}>
            <Text style={styles.serviceTitle}>Mali servisi</Text>
            {mechanicData.smallServicePrice &&
            mechanicData.smallServicePrice.length > 0 ? (
              mechanicData.smallServicePrice.map((brand, index) => (
                <View style={styles.priceRow} key={index}>
                  <Text style={AppStyles.smallText}>{brand.name}</Text>
                  <Text style={[AppStyles.smallText, styles.priceText]}>
                    {brand.price}€
                  </Text>
                </View>
              ))
            ) : (
              <Text style={AppStyles.smallText}>Cene niso podane</Text>
            )}
          </View>

          <View style={styles.servicePriceSection}>
            <Text style={styles.serviceTitle}>Veliki servis</Text>
            {mechanicData.largeServicePrice &&
            mechanicData.largeServicePrice.length > 0 ? (
              mechanicData.largeServicePrice.map((brand, index) => (
                <View style={styles.priceRow} key={index}>
                  <Text style={AppStyles.smallText}>{brand.name}</Text>
                  <Text style={[AppStyles.smallText, styles.priceText]}>
                    {brand.price}€
                  </Text>
                </View>
              ))
            ) : (
              <Text style={AppStyles.smallText}>Cene niso podane</Text>
            )}
          </View>

          <View style={styles.servicePriceSection}>
            <Text style={styles.serviceTitle}>Menjava gum</Text>
            {mechanicData.tireChangePrice &&
            mechanicData.tireChangePrice?.length > 0 ? (
              mechanicData.tireChangePrice.map((brand, index) => (
                <View style={styles.priceRow} key={index}>
                  <Text style={AppStyles.smallText}>{brand.name}</Text>
                  <Text style={[AppStyles.smallText, styles.priceText]}>
                    {brand.price}€
                  </Text>
                </View>
              ))
            ) : (
              <Text style={AppStyles.smallText}>Cene niso podane</Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push(`/mechanics/mechanic/appointment/${id}`)}
        >
          <Text style={styles.buttonText}>Preveri proste termine</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
    borderStyle: "dashed",
    paddingBottom: 15,
    marginHorizontal: 25,
    paddingHorizontal: 5,
  },
  backButton: {
    marginRight: 15,
  },
  contentContainer: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    gap: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 20,
  },
  sectionContainer: {
    gap: 5,
  },
  priceContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  priceNote: {
    color: Colors.light.secondaryText,
    marginBottom: 5,
  },
  servicePriceSection: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: Colors.light.inactiveBorder,
    paddingTop: 8,
  },
  serviceTitle: {
    ...AppStyles.text,
    fontFamily: "Jaldi-Bold",
    marginBottom: 5,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  priceText: {
    fontFamily: "Jaldi-Bold",
  },
  button: {
    backgroundColor: Colors.light.specialBlue,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
    marginTop: 10,
  },
  buttonText: {
    color: Colors.light.darkButtonText,
    fontSize: 18,
    fontFamily: "Jaldi-Bold",
    textAlign: "center",
  },
});
