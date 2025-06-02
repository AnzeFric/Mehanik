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
import { CustomerData, VehicleData } from "@/interfaces/customer";
import { RepairData } from "@/interfaces/repair";
import TitleRow from "@/components/shared/TitleRow";
import { AppStyles } from "@/constants/Styles";
import ImageForm from "@/components/mechanic/library/customer-form/components/forms2/ImageForm";
import RepairForm from "@/components/mechanic/library/customer-form/components/forms2/RepairForm";
import CustomerForm from "@/components/mechanic/library/customer-form/components/forms2/CustomerForm";
import VehicleForm from "@/components/mechanic/library/customer-form/components/forms2/VehicleForm";

export default function AddCustomerScreen() {
  const { saveCustomer } = useCustomer();

  const [customerData, setCustomerData] = useState<CustomerData>();
  const [vehicleData, setVehicleData] = useState<VehicleData>();
  const [repairData, setRepairData] = useState<RepairData | null>(null);

  const scrollRef = useRef<ScrollView>(null);

  const handleSaveImage = (image: string) => {
    setCustomerData((prevData) => ({
      firstName: "",
      lastName: "",
      email: null,
      phone: null,
      ...prevData,
      image: image,
    }));
  };

  const handlePress = () => {
    if (!customerData || !vehicleData) {
      return;
    }

    saveCustomer(customerData, vehicleData, repairData);
    router.push(`/(tabs-mechanic)/library`);

    setCustomerData(undefined);
    setVehicleData(undefined);
    setRepairData(null);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setCustomerData(undefined);
        setVehicleData(undefined);
        setRepairData(null);

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
        <ImageForm image={customerData?.image} setImage={handleSaveImage} />
        <Text style={styles.sectionTitle}>Informacije o stranki</Text>
        <CustomerForm
          customerImage={customerData?.image}
          setCustomer={setCustomerData}
        />
        <Text style={styles.sectionTitle}>Informacije o vozilu</Text>
        <VehicleForm setVehicle={setVehicleData} />
        <Text style={styles.sectionTitle}>Informacije o servisu.</Text>
        <Text style={[AppStyles.smallText, { paddingBottom: 15 }]}>
          Če servis ni bil izveden izberite "Drugo" in pustite prazno.
        </Text>
        <RepairForm setRepair={setRepairData} />
        <TouchableOpacity
          style={[AppStyles.button, styles.button]}
          onPress={handlePress}
        >
          <Text style={AppStyles.buttonText}>Dodaj</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});
