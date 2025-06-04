import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import CustomerForm from "@/components/mechanic/library/forms/CustomerForm";
import TemplateView from "@/components/mechanic/library/TemplateView";
import { CustomerData, VehicleData } from "@/interfaces/customer";
import VehicleForm from "@/components/mechanic/library/forms/VehicleForm";
import ImageForm from "@/components/mechanic/library/forms/ImageForm";
import { useLocalSearchParams } from "expo-router";
import { useCustomer } from "@/hooks/useCustomer";

export default function EditCustomerScreen() {
  const { vin } = useLocalSearchParams();
  const { customers } = useCustomer();

  const [originalCustomer, setOriginalCustomer] = useState<CustomerData>();
  const [originalVehicle, setOriginalVehicle] = useState<VehicleData>();

  const [currentCustomer, setCurrentCustomer] = useState<CustomerData>();
  const [currentVehicle, setCurrentVehicle] = useState<VehicleData>();

  useEffect(() => {
    const foundCustomerVehicle = customers.find(
      (item) => item.vehicle.vin === vin
    );

    if (foundCustomerVehicle) {
      setOriginalCustomer(foundCustomerVehicle.customer);
      setOriginalVehicle(foundCustomerVehicle.vehicle);

      setCurrentCustomer(foundCustomerVehicle.customer);
      setCurrentVehicle(foundCustomerVehicle.vehicle);
    } else {
      // Customer not found
      setOriginalCustomer(undefined);
      setOriginalVehicle(undefined);
      setCurrentCustomer(undefined);
      setCurrentVehicle(undefined);
    }
  }, [customers, vin]);

  const hasCustomerChanges = () => {
    if (!originalCustomer || !currentCustomer) return false;
    return JSON.stringify(originalCustomer) !== JSON.stringify(currentCustomer);
  };

  const hasVehicleChanges = () => {
    if (!originalVehicle || !currentVehicle) return false;
    return JSON.stringify(originalVehicle) !== JSON.stringify(currentVehicle);
  };

  const handleSaveEdit = () => {
    console.log("Saving edit");

    if (hasCustomerChanges()) {
      console.log("Customer data changed:", currentCustomer);
      // Update customer
    }

    if (hasVehicleChanges()) {
      console.log("Vehicle data changed:", currentVehicle);
      // Update vehicle
    }
  };

  const handleSaveImage = (image: string) => {
    setCurrentVehicle((prevData) => ({
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
