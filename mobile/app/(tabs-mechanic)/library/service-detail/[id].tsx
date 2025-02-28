import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useCallback } from "react";
import { AppStyles } from "@/constants/Styles";
import BackIcon from "@/assets/icons/BackIcon.svg";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors";
import {
  formatDate,
  formatServiceType,
  formatServiceItems,
} from "@/constants/util";
import { ServiceData } from "@/interfaces/mechanic";
import ModalPrompt from "@/components/mechanic/modals/ModalPrompt";
import MenuIcon from "@/assets/icons/MenuIcon.svg";

const fakeData: ServiceData = {
  id: 4,
  date: new Date(2024, 7, 30),
  serviceType: "large",
  serviceItems: {
    oilChange: true,
    filterChange: true,
    brakeCheck: true,
    tireRotation: true,
    fluidCheck: true,
    batteryCheck: true,
    sparkPlugs: false,
    airFilter: true,
    cabinFilter: true,
    suspension: true,
    timing: true,
    coolant: true,
  },
  serviceNotes:
    "Annual comprehensive service completed. Timing belt replaced as scheduled maintenance. All systems functioning properly.",
  serviceImages: ["timing_belt_30072024.jpg", "coolant_flush_30072024.jpg"],
  servicePrice: "495.25",
};

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsMenuVisible(false);
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
        <Text style={styles.title}>
          {formatServiceType(fakeData.serviceType)}
        </Text>
        <MenuIcon
          height={30}
          width={30}
          style={{ alignSelf: "center" }}
          onPress={() => {
            setIsMenuVisible(!isMenuVisible);
          }}
        />
        {isMenuVisible && (
          <View style={styles.menuContainer}>
            <TouchableOpacity
              onPress={() => router.push(`/library/service-edit/${id}`)}
            >
              <Text style={[styles.menuItem, styles.menuItemTop]}>UREDI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsModalOpen(true);
              }}
            >
              <Text style={styles.menuItem}>IZBRIŠI</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.scrollViewContent}>
          <View>
            <Text style={AppStyles.title}>Datum izvedbe:</Text>
            <Text style={AppStyles.text}>{formatDate(fakeData.date)}</Text>
          </View>
          <View>
            <Text style={AppStyles.title}>Cena:</Text>
            <Text style={AppStyles.text}>{fakeData.servicePrice}</Text>
          </View>
          <View>
            <Text style={AppStyles.title}>Izvedena popravila:</Text>
            {fakeData.serviceItems &&
              Object.entries(fakeData.serviceItems)
                .filter(([_, value]) => value) // Filter only true values
                .map(([key]) => (
                  <Text key={key} style={AppStyles.text}>
                    - {formatServiceItems(key)}
                  </Text>
                ))}
            {fakeData.customServiceDescription && (
              <Text style={AppStyles.text}>
                {fakeData.customServiceDescription}
              </Text>
            )}
          </View>

          <View>
            <Text style={AppStyles.title}>Dodatne opombe:</Text>
            <Text style={AppStyles.text}>{fakeData.serviceNotes}</Text>
          </View>
          <View>
            <Text style={AppStyles.title}>Slike servisa:</Text>
            <Text style={AppStyles.text}>"Slike"</Text>
          </View>
        </View>
      </ScrollView>
      {isModalOpen && (
        <ModalPrompt
          isVisible={isModalOpen}
          message={"Trajno boste izbrisali servis. Ste prepričani?"}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={() => {}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: "Jaldi-Regular",
    flex: 1,
    textAlign: "center",
  },
  scrollViewContent: {
    gap: 20,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  menuContainer: {
    position: "absolute",
    right: 0,
    top: 60,
    backgroundColor: Colors.light.background,
    width: 200,
    borderRadius: 8,
    shadowColor: Colors.light.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5,
  },
  menuItem: {
    textAlign: "center",
    paddingVertical: 12,
    fontSize: 18,
    fontFamily: "Jaldi-Bold",
  },
  menuItemTop: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
  },
});
