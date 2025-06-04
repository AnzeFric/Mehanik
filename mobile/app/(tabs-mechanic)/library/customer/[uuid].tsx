import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import VehicleDisplay from "@/components/mechanic/library/displays/Vehicle";
import RepairsDisplay from "@/components/mechanic/library/displays/Repairs";
import { CustomerVehicleData } from "@/interfaces/customer";
import TemplateView from "@/components/mechanic/library/TemplateView";
import ModalPrompt from "@/components/mechanic/modals/ModalPrompt";
import PlusButton from "@/components/global/PlusButton";
import { useCustomer } from "@/hooks/useCustomer";
import { useRepair } from "@/hooks/useRepair";
import LoadingScreen from "@/components/global/LoadingScreen";
import CustomerDisplay from "@/components/mechanic/library/displays/Customer";
import { RepairData } from "@/interfaces/repair";
import useCustomerStore from "@/stores/useCustomerStore";
import { Ionicons } from "@expo/vector-icons";

export default function DetailCustomerScreen() {
  const { uuid, firstName } = useLocalSearchParams(); // Vehicle uuid
  const { getVehicleRepairs } = useRepair();
  const { customers, shouldRefetch, setShouldRefetch } = useCustomerStore();
  const { deleteCustomer } = useCustomer();
  const [repairList, setRepairList] = useState<Array<RepairData>>([]);
  const [customer, setCustomer] = useState<CustomerVehicleData>();
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const repairsFetch = async () => {
    const repairData = await getVehicleRepairs(uuid.toString());
    setRepairList(repairData);
  };

  useEffect(() => {
    const customerInit = () => {
      const foundCustomer = customers.find(
        (item) => item.vehicle.uuid === uuid
      );
      setCustomer(foundCustomer);
    };

    customerInit();
    repairsFetch();
  }, [uuid, customers]);

  useFocusEffect(
    useCallback(() => {
      setIsMenuVisible(false);
      setIsModalOpen(false);

      if (shouldRefetch) {
        repairsFetch();
        setShouldRefetch(false);
      }
    }, [shouldRefetch])
  );

  const handleAddService = () => {
    setShouldRefetch(true);
    router.push(`/(tabs-mechanic)/library/repair/add/${uuid}`);
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
      <TouchableOpacity
        style={styles.menuItemContainer}
        onPress={() => router.push(`/library/customer/edit/${uuid}`)}
      >
        <Ionicons name="create-outline" size={18} color={Colors.light.text} />
        <Text style={styles.menuItem}>UREDI</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuItemContainer, styles.menuItemDelete]}
        onPress={() => setIsModalOpen(true)}
      >
        <Ionicons name="trash-outline" size={18} color="#E53935" />
        <Text style={[styles.menuItem, styles.menuItemTextDelete]}>
          IZBRIŠI
        </Text>
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
              <RepairsDisplay
                repairList={repairList}
                vehicleUuid={customer.vehicle.uuid}
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
    backgroundColor: "#FFFFFF",
    width: 180,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 5,
    padding: 6,
    overflow: "hidden",
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 2,
    borderRadius: 8,
  },
  menuItem: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 12,
    color: Colors.light.text,
  },
  menuItemDelete: {
    backgroundColor: "rgba(229, 57, 53, 0.08)",
  },
  menuItemTextDelete: {
    color: "#E53935",
  },
});
