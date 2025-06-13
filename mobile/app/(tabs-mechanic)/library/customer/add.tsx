import { View, ScrollView, StyleSheet } from "react-native";
import { useState, useCallback, useRef, useMemo } from "react";
import { router, useFocusEffect } from "expo-router";
import { useCustomer } from "@/hooks/useCustomer";
import { CustomerData } from "@/interfaces/customer";
import { VehicleData } from "@/interfaces/vehicle";
import { RepairData } from "@/interfaces/repair";
import TitleRow from "@/components/shared/TitleRow";
import ImageForm from "@/components/mechanic/library/forms/ImageForm";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import CustomerForm from "@/components/mechanic/library/forms/CustomerForm";
import VehicleForm from "@/components/mechanic/library/forms/VehicleForm";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedButton from "@/components/global/themed/ThemedButton";

export default function AddCustomerScreen() {
  const { saveCustomerVehicleRepair } = useCustomer();

  const [customerData, setCustomerData] = useState<CustomerData>({
    uuid: "",
    firstName: "",
    lastName: "",
    email: null,
    phone: null,
  });
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    uuid: "",
    brand: "",
    model: "",
    vin: "",
    image: null,
    buildYear: null,
    description: null,
  });
  const [repairData, setRepairData] = useState<RepairData | null>(null);
  const [vehicleImage, setVehicleImage] = useState<string>("");

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

  const handlePress = async () => {
    if (!canSave) {
      return;
    }

    const finalVehicleData = {
      ...vehicleData,
      image: vehicleImage || null,
    };

    await saveCustomerVehicleRepair(customerData, finalVehicleData, repairData);

    router.push(`/(tabs-mechanic)/library`);
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
      <TitleRow title={"Dodaj stranko"} hasBackButton={true} />
      <ScrollView
        style={styles.childrenContainer}
        contentContainerStyle={{ gap: 25 }}
        ref={scrollRef}
      >
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
          onPress={handlePress}
          selected={canSave}
          disabled={!canSave}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  childrenContainer: {
    paddingHorizontal: 25,
    marginVertical: 20,
  },
});
