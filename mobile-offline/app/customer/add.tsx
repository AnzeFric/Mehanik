import { View, ScrollView, StyleSheet } from "react-native";
import { useState, useCallback, useRef, useMemo } from "react";
import { router, useFocusEffect } from "expo-router";
import { CustomerData, CustomerFormData } from "@/interfaces/customer";
import { VehicleData } from "@/interfaces/vehicle";
import { RepairData } from "@/interfaces/repair";
import TitleRow from "@/components/global/TitleRow";
import ImageForm from "@/components/mechanic/library/forms/ImageForm";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import CustomerForm from "@/components/mechanic/library/forms/CustomerForm";
import VehicleForm from "@/components/mechanic/library/forms/VehicleForm";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedButton from "@/components/global/themed/ThemedButton";
import useDataStore from "@/stores/useDataStore";

export default function AddCustomerScreen() {
  const { customers, setCustomers } = useDataStore();

  const [repairData, setRepairData] = useState<RepairData | null>(null);
  const [vehicleImage, setVehicleImage] = useState("");
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: "",
    lastName: "",
    email: null,
    phone: null,
  });
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    brand: "",
    model: "",
    vin: "",
    image: null,
    buildYear: null,
    description: null,
  });

  const scrollRef = useRef<ScrollView>(null);

  const canSave: boolean = useMemo(() => {
    return Boolean(
      customerData &&
        vehicleData &&
        customerData.firstName &&
        customerData.lastName &&
        vehicleData.brand &&
        vehicleData.model &&
        vehicleData.vin
    );
  }, [customerData, vehicleData]);

  const saveCustomer = async () => {
    if (!canSave) {
      return;
    }

    const newCustomer: CustomerFormData = {
      id: customers.length + 1,
      customer: customerData,
      vehicle: {
        ...vehicleData,
        image: vehicleImage,
      },
      repair: repairData ? [repairData] : null,
    };

    const newCustomers = customers;
    newCustomers.push(newCustomer);

    setCustomers(newCustomers);
    router.push(`/`);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ y: 0 });
        }
      };
    }, [])
  );

  return (
    <ThemedView type={"background"} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} ref={scrollRef}>
        <TitleRow title={"Dodaj stranko"} hasBackButton={true} />
        <ImageForm setImage={setVehicleImage} />
        <View>
          <ThemedText type={"title"} bold>
            Stranka
          </ThemedText>
          <CustomerForm setCustomer={setCustomerData} />
        </View>
        <View>
          <ThemedText type={"title"} bold>
            Vozilo
          </ThemedText>
          <VehicleForm setVehicle={setVehicleData} />
        </View>
        <View>
          <ThemedText type={"title"} bold>
            Servis
          </ThemedText>
          <ThemedText type={"small"} style={{ paddingBottom: 15 }}>
            Če servis ni bil izveden izberite "Drugo" in pustite prazno.
          </ThemedText>
          <RepairForm setRepair={setRepairData} />
        </View>
        <ThemedButton
          buttonType={"small"}
          buttonText={"Dodaj"}
          onPress={saveCustomer}
          selected={canSave}
          disabled={!canSave}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 25,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
});
