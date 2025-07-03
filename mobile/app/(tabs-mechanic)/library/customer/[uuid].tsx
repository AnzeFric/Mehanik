import { View, StyleSheet, Alert } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import VehicleDisplay from "@/components/mechanic/library/displays/Vehicle";
import RepairsDisplay from "@/components/mechanic/library/displays/Repairs";
import { CustomerVehicleData } from "@/interfaces/customer";
import TemplateView from "@/components/mechanic/library/TemplateView";
import ModalPrompt from "@/components/global/modals/ModalPrompt";
import PlusButton from "@/components/global/PlusButton";
import { useCustomer } from "@/hooks/accounts/useCustomer";
import { useRepair } from "@/hooks/useRepair";
import LoadingScreen from "@/components/global/LoadingScreen";
import CustomerDisplay from "@/components/mechanic/library/displays/Customer";
import { RepairData } from "@/interfaces/repair";
import useCustomerStore from "@/stores/accounts/useCustomerStore";
import ThemedIcon from "@/components/global/themed/ThemedIcon";
import ThemedText from "@/components/global/themed/ThemedText";
import EditMenu from "@/components/mechanic/library/EditMenu";

export default function DetailCustomerScreen() {
  const { uuid, firstName } = useLocalSearchParams(); // Vehicle uuid

  const { getVehicleRepairs } = useRepair();
  const { customers, shouldRefetch, setShouldRefetch } = useCustomerStore();
  const { deleteCustomer } = useCustomer();

  const [repairList, setRepairList] = useState<Array<RepairData>>([]);
  const [customer, setCustomer] = useState<CustomerVehicleData>();
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const repairsFetch = async () => {
    setLoading(true);
    const repairData = await getVehicleRepairs(uuid.toString());
    setRepairList(repairData);
    setLoading(false);
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

  const handleAddRepair = () => {
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

  return (
    <>
      <TemplateView
        title={`${firstName}`}
        backButton={true}
        isMenuVisible={isMenuVisible}
        menu={
          <EditMenu
            onEditPress={() => router.push(`/library/customer/edit/${uuid}`)}
            onDeleteClose={() => setIsModalOpen(true)}
          />
        }
        menuIcon={
          <ThemedIcon
            name={"menu"}
            size={30}
            onPress={() => {
              setIsMenuVisible(!isMenuVisible);
            }}
          />
        }
      >
        <View style={styles.container}>
          {customer ? (
            <>
              <View style={styles.contentContainer}>
                <VehicleDisplay vehicle={customer.vehicle} />
                <CustomerDisplay customer={customer.customer} />
              </View>
              <ThemedText type={"title"}>Narejeni servisi</ThemedText>
              {loading ? (
                <LoadingScreen
                  type={"partial"}
                  text={"Nalaganje..."}
                  style={{ paddingVertical: 30 }}
                />
              ) : (
                <RepairsDisplay repairList={repairList} />
              )}

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
            <LoadingScreen type={"full"} text={"Nalaganje..."} />
          )}
        </View>
      </TemplateView>
      <PlusButton onPress={handleAddRepair} />
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
    paddingBottom: 15,
  },
  menuContainer: {
    position: "absolute",
    right: 20,
    top: -10,
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
  },
  menuLine: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
  },
  menuItem: {
    marginLeft: 12,
  },
});
