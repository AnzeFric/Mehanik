import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import VehicleData from "@/components/mechanic/library/VehicleData";
import ServicesMap from "@/components/mechanic/library/ServicesMap";
import { ServiceData } from "@/interfaces/mechanic";
import TemplateView from "@/components/mechanic/library/TemplateView";
import ModalPrompt from "@/components/mechanic/modals/ModalPrompt";
import PlusButton from "@/components/global/PlusButton";

const fakeServiceData: ServiceData[] = [
  {
    id: 0,
    date: new Date(2024, 10, 15),
    type: "small",
    options: {
      oilChange: true,
      filterChange: true,
      brakeCheck: true,
      fluidCheck: true,
      batteryCheck: true,
    },
    message:
      "Regular maintenance completed. Recommended timing belt check in next service.",
    price: 89.99,
  },
  {
    id: 1,
    date: new Date(2024, 10, 22),
    type: "large",
    options: {
      oilChange: true,
      filterChange: true,
      brakeCheck: true,
      tireRotation: true,
      fluidCheck: true,
      batteryCheck: true,
      sparkPlugs: true,
      airFilter: true,
      cabinFilter: true,
      suspension: true,
    },
    message:
      "Complete service performed. Noticed slight wear on rear brake pads - will need replacement in approximately 5000km.",
    images: ["brake_check_22102024.jpg", "suspension_22102024.jpg"],
    price: 329.5,
  },
  {
    id: 2,
    date: new Date(2024, 9, 5),
    type: "small",
    options: {
      oilChange: true,
      filterChange: true,
      fluidCheck: true,
    },
    message:
      "Quick service performed. Customer requested minimal work due to budget constraints.",
    price: 65.75,
  },
  {
    id: 3,
    date: new Date(2024, 8, 17),
    type: "other",
    customServiceDescription: "Emergency brake system repair",
    message:
      "Replaced brake master cylinder and bled entire system. Tested functionality - all working properly now.",
    images: ["brake_repair_before.jpg", "brake_repair_after.jpg"],
    price: 245.0,
  },
  {
    id: 4,
    date: new Date(2024, 7, 30),
    type: "large",
    options: {
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
    message:
      "Annual comprehensive service completed. Timing belt replaced as scheduled maintenance. All systems functioning properly.",
    images: ["timing_belt_30072024.jpg", "coolant_flush_30072024.jpg"],
    price: 495.25,
  },
  {
    id: 5,
    date: new Date(2024, 6, 12),
    type: "other",
    customServiceDescription: "Air conditioning system repair",
    message:
      "Recharged AC system and replaced faulty compressor. System now cooling properly.",
    price: 385.0,
  },
  {
    id: 6,
    date: new Date(2024, 5, 28),
    type: "small",
    options: {
      oilChange: true,
      filterChange: true,
      brakeCheck: true,
      fluidCheck: true,
    },
    message: "Standard service performed. All fluids topped up.",
    price: 79.99,
  },
  {
    id: 7,
    date: new Date(2024, 4, 3),
    type: "large",
    options: {
      oilChange: true,
      filterChange: true,
      brakeCheck: true,
      tireRotation: true,
      fluidCheck: true,
      batteryCheck: true,
      sparkPlugs: true,
      airFilter: true,
      cabinFilter: true,
      coolant: true,
    },
    message:
      "Major service completed. Replaced all spark plugs and performed coolant flush.",
    images: ["sparkplugs_03042024.jpg"],
    price: 375.5,
  },
  {
    id: 8,
    date: new Date(2024, 3, 19),
    type: "other",
    customServiceDescription: "Engine diagnostic and tune-up",
    message:
      "Performed complete engine diagnostic after customer reported rough idling. Adjusted fuel mixture and cleaned injectors. Engine now running smoothly.",
    images: ["engine_diagnostic_19032024.jpg"],
    price: 195.0,
  },
  {
    id: 9,
    date: new Date(2024, 2, 5),
    type: "small",
    options: {
      oilChange: true,
      filterChange: true,
      tireRotation: true,
      batteryCheck: true,
    },
    message:
      "Winter service check completed. Battery tested and showing good health for cold weather.",
    price: 95.5,
  },
];

export default function DetailServiceScreen() {
  const { email } = useLocalSearchParams();
  const [serviceList, setServiceList] = useState<Array<ServiceData>>([]);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {}, [email]);

  // CallBack for screen closing
  useFocusEffect(
    useCallback(() => {
      setIsMenuVisible(false);
    }, [])
  );

  const handlePress = () => {
    router.push(`/(tabs-mechanic)/library/service-add/${email}`);
  };

  const menuIcon: React.ReactNode = (
    <MenuIcon
      height={30}
      width={30}
      style={{ alignSelf: "flex-start" }}
      onPress={() => {
        setIsMenuVisible(!isMenuVisible);
      }}
    />
  );

  const menu: React.ReactNode = (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={() => {}}>
        <Text style={[styles.menuItem, styles.menuItemTop]}>PROMETNA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push(`/library/customer-edit/${email}`)}
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
  );

  return (
    <>
      <TemplateView
        title={`Oseba ${email}`}
        isMenuVisible={isMenuVisible}
        menu={menu}
        menuIcon={menuIcon}
      >
        <View style={styles.container}>
          <VehicleData
            imageUri={""}
            brandAndSeries={"Volkswagen Golf"}
            year={2009}
            description={"Nek dodaten opis"}
            vin={"A71239SASFV"}
          />
          <ServicesMap serviceList={fakeServiceData} />
          {isModalOpen && (
            <ModalPrompt
              isVisible={isModalOpen}
              message={"Trajno boste izbrisali uporabnika. Ste prepričani?"}
              onCancel={() => setIsModalOpen(false)}
              onConfirm={() => {}}
            />
          )}
        </View>
      </TemplateView>
      <PlusButton onPress={handlePress} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  menuContainer: {
    position: "absolute",
    right: 20,
    top: -10,
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
    fontWeight: "bold",
  },
  menuItemTop: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
  },
});
