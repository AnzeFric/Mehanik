import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useCallback, useRef } from "react";
import { router, useFocusEffect } from "expo-router";
import { useCustomer } from "@/hooks/useCustomer";
import { CustomerData } from "@/interfaces/customer";
import { VehicleData } from "@/interfaces/vehicle";
import { RepairData } from "@/interfaces/repair";
import TitleRow from "@/components/shared/TitleRow";
import { AppStyles } from "@/constants/Styles";
import ImageForm from "@/components/mechanic/library/forms/ImageForm";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import CustomerForm from "@/components/mechanic/library/forms/CustomerForm";
import VehicleForm from "@/components/mechanic/library/forms/VehicleForm";

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

  const handleSaveImage = (image: string) => {
    setVehicleImage(image);
    setVehicleData((prevData) => ({
      ...prevData,
      image: image,
    }));
  };

  const canSave = () => {
    return (
      customerData &&
      vehicleData &&
      customerData.firstName &&
      customerData.lastName &&
      vehicleData.brand &&
      vehicleData.model &&
      vehicleData.vin
    );
  };

  const handlePress = async () => {
    if (!canSave()) {
      return;
    }

    const finalVehicleData = {
      ...vehicleData,
      image: vehicleImage || null,
    };

    await saveCustomerVehicleRepair(customerData, finalVehicleData, repairData);

    router.push(`/(tabs-mechanic)/library`);
  };

  // Reset form when screen loses focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        setCustomerData({
          uuid: "",
          firstName: "",
          lastName: "",
          email: null,
          phone: null,
        });
        setVehicleData({
          uuid: "",
          brand: "",
          model: "",
          vin: "",
          image: null,
          buildYear: null,
          description: null,
        });
        setRepairData(null);
        setVehicleImage("");

        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ y: 0 });
          }
        }, 100);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <TitleRow title={"Dodaj stranko"} hasBackButton={true} />
      <ScrollView style={styles.childrenContainer} ref={scrollRef}>
        <ImageForm setImage={handleSaveImage} />

        <Text style={styles.sectionTitle}>Informacije o stranki</Text>
        <CustomerForm setCustomer={setCustomerData} />

        <Text style={styles.sectionTitle}>Informacije o vozilu</Text>
        <VehicleForm setVehicle={setVehicleData} />

        <Text style={styles.sectionTitle}>Informacije o servisu.</Text>
        <Text style={[AppStyles.smallText, { paddingBottom: 15 }]}>
          Če servis ni bil izveden izberite "Drugo" in pustite prazno.
        </Text>
        <RepairForm setRepair={setRepairData} />

        <TouchableOpacity
          style={[
            AppStyles.button,
            styles.button,
            !canSave() && styles.buttonDisabled,
          ]}
          onPress={handlePress}
          disabled={!canSave()}
        >
          <Text
            style={[
              AppStyles.buttonText,
              !canSave() && styles.buttonTextDisabled,
            ]}
          >
            Dodaj
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  childrenContainer: {
    flex: 1,
    paddingHorizontal: 25,
    marginVertical: 20,
  },
  button: {
    marginTop: 25,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonTextDisabled: {
    opacity: 0.7,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});
