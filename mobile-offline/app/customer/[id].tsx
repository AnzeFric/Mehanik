import { View, StyleSheet } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import VehicleDisplay from "@/components/mechanic/library/displays/Vehicle";
import RepairsDisplay from "@/components/mechanic/library/displays/Repairs";
import TemplateView from "@/components/mechanic/library/TemplateView";
import ModalPrompt from "@/components/global/modals/ModalPrompt";
import PlusButton from "@/components/global/PlusButton";
import LoadingScreen from "@/components/global/LoadingScreen";
import CustomerDisplay from "@/components/mechanic/library/displays/Customer";
import { RepairData } from "@/interfaces/repair";
import useDataStore from "@/stores/useDataStore";
import ThemedIcon from "@/components/global/themed/ThemedIcon";
import ThemedText from "@/components/global/themed/ThemedText";
import EditMenu from "@/components/mechanic/library/EditMenu";
import { CustomerFormData } from "@/interfaces/customer";

export default function DetailCustomerScreen() {
  const { id, firstName } = useLocalSearchParams(); // Vehicle uuid

  const { customers } = useDataStore();

  const [repairList, setRepairList] = useState<Array<RepairData>>([]);
  const [customer, setCustomer] = useState<CustomerFormData>();
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const index = parseInt(id.toString());
    setCustomer(customers[index]);
  }, [customers]);

  useFocusEffect(
    useCallback(() => {
      setIsMenuVisible(false);
      setIsModalOpen(false);
    }, [])
  );

  const handleAddRepair = () => {
    router.push(`/repair/add/${id}`);
  };

  const handleDeleteCustomer = async () => {
    setIsModalOpen(false);

    router.back();
  };

  return (
    <>
      <TemplateView
        title={`${firstName}`}
        backButton={true}
        isMenuVisible={isMenuVisible}
        menu={
          <EditMenu
            onEditPress={() => router.push(`/customer/edit/${id}`)}
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
                <RepairsDisplay
                  repairList={repairList}
                  vehicleUuid={customer.vehicle.uuid}
                />
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
