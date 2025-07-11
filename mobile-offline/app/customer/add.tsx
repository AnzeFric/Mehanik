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
import { database } from "@/database/index";
import Customer from "@/database/models/Customer";
import Vehicle from "@/database/models/Vehicle";
import Repair from "@/database/models/Repair";
import uuid from "react-native-uuid";

export default function AddCustomerScreen() {
  const [repairData, setRepairData] = useState<RepairData | null>(null);
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

  const repairExists = (): boolean => {
    // If user follows instructions
    if (repairData?.type === "other" && repairData.description === null) {
      return false;
    }

    let allOptionsFalse = true;
    // If user selected "small" or "large" option and did not select an option
    Object.values(repairData?.options || {}).map((option) => {
      if (option === true) {
        allOptionsFalse = false;
      }
    });
    if (allOptionsFalse) return false;

    return true;
  };

  const saveCustomer = async () => {
    if (!canSave) {
      return;
    }
    setSaving(true);

    try {
      await database.write(async () => {
        const customerUuid = uuid.v4();

        // Create customer
        const customer = await database
          .get<Customer>("customers")
          .create((customer) => {
            customer.uuid = customerUuid;
            customer.firstName = customerData.firstName.trim();
            customer.lastName = customerData.lastName.trim();
            customer.email = customerData.email?.trim() || null;
            customer.phone = customerData.phone?.trim() || null;
          });

        // Create vehicle
        await database.get<Vehicle>("vehicles").create((vehicle) => {
          vehicle.brand = vehicleData.brand.trim();
          vehicle.model = vehicleData.model.trim();
          vehicle.buildYear = vehicleData.buildYear;
          vehicle.vin = vehicleData.vin?.trim() || null;
          vehicle.image = vehicleImage || vehicleData.image;
          vehicle.description = vehicleData.description?.trim() || null;
          vehicle.customerId = customer.id; // WatermelonDB auto-generates id
        });

        // Create repair if provided
        if (repairExists() && repairData) {
          await database.get<Repair>("repairs").create((repair) => {
            repair.uuid = repairData.uuid || uuid.v4();
            repair.type = repairData.type;
            repair.price = repairData.price;
            repair.repairDate = repairData.repairDate;
            repair.options = repairData.options;
            repair.description = repairData.description?.trim() || null;
            repair.images = repairData.images || [];
            repair.note = repairData.note?.trim() || null;
            repair.customerId = customer.id; // WatermelonDB auto generates id
          });
        }
      });

      router.push("/");
    } catch (error) {
      console.error("Error saving customer:", error);
      Alert.alert(
        "Napaka",
        "Prišlo je do napake pri shranjevanju stranke. Poskusite znova.",
        [{ text: "V redu" }]
      );
    } finally {
      setSaving(false);
    }
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
        <View style={styles.buttonContainer}>
          <ThemedButton
            buttonType={"small"}
            buttonText={saving ? "Shranjujem..." : "Dodaj"}
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
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  buttonContainer: {
    gap: 15,
  },
});
