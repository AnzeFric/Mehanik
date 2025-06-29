import { View, StyleSheet } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import VehicleDisplay from "@/components/mechanic/library/displays/Vehicle";
import RepairsDisplay from "@/components/mechanic/library/displays/Repairs";
import TemplateView from "@/components/mechanic/library/TemplateView";
import PlusButton from "@/components/global/PlusButton";
import CustomerDisplay from "@/components/mechanic/library/displays/Customer";
import useDataStore from "@/stores/useDataStore";
import ThemedIcon from "@/components/global/themed/ThemedIcon";
import ThemedText from "@/components/global/themed/ThemedText";
import EditMenu from "@/components/mechanic/library/EditMenu";
import { CustomerFormData } from "@/interfaces/customer";

export default function DetailCustomerScreen() {
  const { id, firstName } = useLocalSearchParams(); // Customer id

  const { customers } = useDataStore();

  const [customer, setCustomer] = useState<CustomerFormData>();
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    const intId = parseInt(id.toString());
    const foundCustomer = customers.find((customer) => customer.id === intId);
    setCustomer(foundCustomer);
  }, [customers]);

  useFocusEffect(
    useCallback(() => {
      setIsMenuVisible(false);
    }, [])
  );

  const handleAddRepair = () => {
    router.push(`/repair/add/${id}`);
  };

  const exportCustomer = () => {
    // TODO: export customer to gmail
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
            onExportPress={exportCustomer}
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
        <View style={styles.contentContainer}>
          {customer?.vehicle && <VehicleDisplay vehicle={customer.vehicle} />}
          {customer?.customer && (
            <CustomerDisplay customer={customer.customer} />
          )}
        </View>
        <ThemedText type={"title"}>Narejeni servisi</ThemedText>
        {customer && (
          <RepairsDisplay
            repairList={customer.repair}
            customerId={customer.id}
          />
        )}
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
