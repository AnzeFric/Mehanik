import { View, ScrollView, StyleSheet } from "react-native";
import { useState, useCallback, useRef, useMemo } from "react";
import { router, useFocusEffect } from "expo-router";
import { CustomerData } from "@/interfaces/customer";
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

export default function AddCustomerScreen() {
  const [repairData, setRepairData] = useState<RepairData | null>(null);
  const [vehicleImage, setVehicleImage] = useState("");
  const [customerData, setCustomerData] = useState<CustomerData>({
    id: 0,
    firstName: "",
    lastName: "",
    email: null,
    phone: null,
  });
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    id: 0,
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

  const handlePress = async () => {
    if (!canSave) {
      return;
    }

    const finalVehicleData = {
      ...vehicleData,
      image: vehicleImage || null,
    };

    // TODO: Save data
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
          onPress={handlePress}
          selected={canSave}
          disabled={!canSave}
          buttonStyle={{ marginBottom: 20 }}
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
