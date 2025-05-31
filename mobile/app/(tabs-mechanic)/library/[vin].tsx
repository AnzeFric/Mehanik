import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import VehicleData from "@/components/mechanic/library/VehicleData";
import ServicesMap from "@/components/mechanic/library/ServicesMap";
import { CustomerData, ServiceData } from "@/interfaces/mechanic";
import TemplateView from "@/components/mechanic/library/TemplateView";
import ModalPrompt from "@/components/mechanic/modals/ModalPrompt";
import PlusButton from "@/components/global/PlusButton";
import { useRepair } from "@/hooks/useRepair";

export default function DetailServiceScreen() {
  const { vin, firstName } = useLocalSearchParams();
  const { customers, getMechanicVehicleRepairs } = useRepair();
  const [serviceList, setServiceList] = useState<Array<ServiceData>>([]);
  const [customer, setCustomer] = useState<CustomerData | undefined>(undefined);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const customerInit = () => {
      const foundCustomer = customers.find((item) => item.vin === vin);
      setCustomer(foundCustomer);
    };
    const repairsFetch = async () => {
      const repairData = await getMechanicVehicleRepairs(vin.toString());
      setServiceList(repairData);
    };

    customerInit();
    repairsFetch();
  }, [vin]);

  // CallBack for screen closing
  useFocusEffect(
    useCallback(() => {
      setIsMenuVisible(false);
    }, [])
  );

  const handlePress = () => {
    router.push(`/(tabs-mechanic)/library/service-add/${vin}`);
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
        onPress={() => router.push(`/library/customer-edit/${vin}`)}
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
        title={`${firstName}`}
        isMenuVisible={isMenuVisible}
        menu={menu}
        menuIcon={menuIcon}
      >
        <View style={styles.container}>
          <Text>TODO: Dodaj podatke o uporabniku</Text>
          <VehicleData
            imageUri={customer?.image}
            brand={customer?.brand}
            model={customer?.model}
            year={customer?.buildYear}
            vin={customer?.vin}
            description={customer?.description}
          />
          <ServicesMap serviceList={serviceList} />
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
