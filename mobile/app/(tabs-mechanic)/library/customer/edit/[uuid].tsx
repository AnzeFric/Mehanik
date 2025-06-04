import { View, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import CustomerForm from "@/components/mechanic/library/forms/CustomerForm";
import TemplateView from "@/components/mechanic/library/TemplateView";
import { CustomerData } from "@/interfaces/customer";
import { VehicleData } from "@/interfaces/vehicle";
import VehicleForm from "@/components/mechanic/library/forms/VehicleForm";
import ImageForm from "@/components/mechanic/library/forms/ImageForm";
import { router, useLocalSearchParams } from "expo-router";
import { useCustomer } from "@/hooks/useCustomer";
import { useVehicle } from "@/hooks/useVehicle";

export default function EditCustomerScreen() {
  const { uuid } = useLocalSearchParams(); // Vehicle uuid
  const { updateVehicle } = useVehicle();
  const { customers, updateCustomer } = useCustomer();

  const [originalCustomer, setOriginalCustomer] = useState<CustomerData>();
  const [originalVehicle, setOriginalVehicle] = useState<VehicleData>();

  const [currentCustomer, setCurrentCustomer] = useState<CustomerData>();
  const [currentVehicle, setCurrentVehicle] = useState<VehicleData>();

  useEffect(() => {
    const foundCustomerVehicle = customers.find(
      (item) => item.vehicle.uuid === uuid
    );

    if (foundCustomerVehicle) {
      setOriginalCustomer(foundCustomerVehicle.customer);
      setOriginalVehicle(foundCustomerVehicle.vehicle);

      setCurrentCustomer(foundCustomerVehicle.customer);
      setCurrentVehicle(foundCustomerVehicle.vehicle);
    }
  }, [customers]);

  const hasCustomerChanges = () => {
    if (!originalCustomer || !currentCustomer) return false;
    return JSON.stringify(originalCustomer) !== JSON.stringify(currentCustomer);
  };

  const hasVehicleChanges = () => {
    if (!originalVehicle || !currentVehicle) return false;
    return JSON.stringify(originalVehicle) !== JSON.stringify(currentVehicle);
  };

  const handleSaveEdit = async () => {
    if (hasCustomerChanges()) {
      if (currentCustomer) {
        var customerRes = await updateCustomer(currentCustomer);
      }
    }
    if (hasVehicleChanges()) {
      if (currentVehicle) {
        var vehicleRes = await updateVehicle(currentVehicle);
      }
    }
    if (!vehicleRes || !customerRes) {
      Alert.alert(
        "Napaka",
        "Prišlo je do napake pri posodabljanju podatkov. Poskusite ponovno kasneje"
      );
    }
    router.back();
  };

  const handleSaveImage = (image: string) => {
    setCurrentVehicle((prevData) => ({
      uuid: "",
      brand: "",
      model: "",
      buildYear: null,
      vin: "",
      description: null,
      ...prevData,
      image: image,
    }));
  };

  return (
    <TemplateView
      title={"Uredi stranko"}
      buttonText={"Uredi"}
      onButtonPress={handleSaveEdit}
    >
      <View style={styles.container}>
        <ImageForm image={originalVehicle?.image} setImage={handleSaveImage} />
        <CustomerForm
          customer={originalCustomer}
          setCustomer={setCurrentCustomer}
        />
        <VehicleForm vehicle={originalVehicle} setVehicle={setCurrentVehicle} />
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
});
