import { View, ScrollView, StyleSheet, Alert } from "react-native";
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
import { useCustomers } from "@/hooks/useCustomers";
import useDataStore from "@/stores/useDataStore";
import { useTranslation } from "react-i18next";

export default function AddCustomerScreen() {
  const { setCustomers } = useDataStore();

  const { addCustomer, fetchCustomers } = useCustomers();
  const { t } = useTranslation();

  const [repairData, setRepairData] = useState<RepairData>();
  const [vehicleImage, setVehicleImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData>({
    uuid: "",
    firstName: "",
    lastName: "",
    email: null,
    phone: null,
  });
  const [vehicleData, setVehicleData] = useState<VehicleData>({
    brand: "",
    model: "",
    vin: null,
    image: null,
    buildYear: null,
    description: null,
    customerId: "",
  });

  const scrollRef = useRef<ScrollView>(null);

  const canSave: boolean = useMemo(() => {
    return Boolean(
      customerData &&
        vehicleData &&
        customerData.firstName.trim() &&
        customerData.lastName.trim() &&
        vehicleData.brand.trim() &&
        vehicleData.model.trim() &&
        !saving
    );
  }, [customerData, vehicleData, saving]);

  const saveCustomer = async () => {
    if (!canSave) {
      return;
    }
    setSaving(true);

    const combinedVehicleData: VehicleData = {
      ...vehicleData,
      image: vehicleImage,
    };

    const success = await addCustomer(
      customerData,
      combinedVehicleData,
      repairData
    );
    if (success) {
      const newCustomers = await fetchCustomers();
      if (newCustomers) setCustomers(newCustomers);
    } else {
      Alert.alert(
        t("screens.customerAdd.text.customerFailTitle"),
        t("screens.customerAdd.text.customerFailText")
      );
    }
    setSaving(false);
    router.push("/");
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
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps={"handled"}
        ref={scrollRef}
      >
        <TitleRow
          title={t("screens.customerAdd.text.title")}
          hasBackButton={true}
        />
        <ImageForm setImage={setVehicleImage} />
        <View>
          <ThemedText type={"title"} bold>
            {t("screens.customerAdd.text.customerSection")}
          </ThemedText>
          <CustomerForm setCustomer={setCustomerData} />
        </View>
        <View>
          <ThemedText type={"title"} bold>
            {t("screens.customerAdd.text.vehicleSection")}
          </ThemedText>
          <VehicleForm setVehicle={setVehicleData} />
        </View>
        <View>
          <ThemedText type={"title"} bold>
            {t("screens.customerAdd.text.repairSection")}
          </ThemedText>
          <ThemedText type={"small"} style={{ paddingBottom: 15 }}>
            {t("screens.customerAdd.text.emptyRepairNotice")}
          </ThemedText>
          <RepairForm setRepair={setRepairData} />
        </View>
        <View style={styles.buttonContainer}>
          <ThemedButton
            buttonType={"small"}
            buttonText={
              saving
                ? t("screens.customerAdd.text.buttonSavingText")
                : t("screens.customerAdd.text.buttonAddText")
            }
            onPress={saveCustomer}
            selected={canSave}
            disabled={!canSave}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 25,
    paddingBottom: 25,
    paddingHorizontal: 25,
  },
  buttonContainer: {
    gap: 15,
  },
});
