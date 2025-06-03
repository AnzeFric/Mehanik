import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useState, useCallback, useEffect, useRef } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import VehicleDisplay from "@/components/mechanic/library/VehicleDisplay";
import ServicesMap from "@/components/mechanic/library/ServicesMap";
import { CustomerVehicleData } from "@/interfaces/customer";
import TemplateView from "@/components/mechanic/library/TemplateView";
import ModalPrompt from "@/components/mechanic/modals/ModalPrompt";
import PlusButton from "@/components/global/PlusButton";
import { useCustomer } from "@/hooks/useCustomer";
import { useRepair } from "@/hooks/useRepair";
import LoadingScreen from "@/components/global/LoadingScreen";
import CustomerDisplay from "@/components/mechanic/library/CustomerDisplay";
import { RepairData } from "@/interfaces/repair";

export default function DetailCustomerScreen() {
  const { vin, firstName } = useLocalSearchParams();
  const { getVehicleRepairs } = useRepair();
  const { customers, deleteCustomer } = useCustomer();
  const [serviceList, setServiceList] = useState<Array<RepairData>>([]);
  const [customer, setCustomer] = useState<CustomerVehicleData>();
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const shouldRefetch = useRef<Boolean>(false);

  const repairsFetch = async () => {
    const repairData = await getVehicleRepairs(vin.toString());
    setServiceList(repairData);
  };

  useEffect(() => {
    const customerInit = () => {
      const foundCustomer = customers.find((item) => item.vehicle.vin === vin);
      setCustomer(foundCustomer);
    };

    customerInit();
    repairsFetch();
  }, [vin]);

  useFocusEffect(
    useCallback(() => {
      setIsMenuVisible(false);
      setIsModalOpen(false);

      if (shouldRefetch.current) {
        repairsFetch();
        shouldRefetch.current = false;
      }
    }, [])
  );

  const handleAddService = () => {
    shouldRefetch.current = true;
    router.push(`/(tabs-mechanic)/library/repair/add/${vin}`);
  };

  const handleDeleteCustomer = async () => {
    const success = await deleteCustomer(customer?.customer.uuid);
    setIsModalOpen(false);

    if (success) {
      router.back();
    } else {
      Alert.alert(
        "Napaka",
        "Napaka pri brisanju stranke. Poskusite ponovno pozneje."
      );
    }
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
        onPress={() => router.push(`/library/customer/edit/${vin}`)}
      >
        <Text style={[styles.menuItem, styles.menuItemTop]}>UREDI</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsModalOpen(true)}>
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
          {customer ? (
            <>
              <View style={styles.contentContainer}>
                <VehicleDisplay vehicle={customer.vehicle} />
                <CustomerDisplay customer={customer.customer} />
              </View>
              <ServicesMap
                serviceList={serviceList}
                vehicleVin={customer.vehicle.vin}
              />
              {isModalOpen && (
                <ModalPrompt
                  isVisible={isModalOpen}
                  message={"Trajno boste izbrisali uporabnika. Ste prepričani?"}
                  onCancel={() => setIsModalOpen(false)}
                  onConfirm={handleDeleteCustomer}
                />
              )}
            </>
          ) : (
            <LoadingScreen />
          )}
        </View>
      </TemplateView>
      <PlusButton onPress={handleAddService} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  contentContainer: {
    gap: 15,
    paddingBottom: 30,
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
