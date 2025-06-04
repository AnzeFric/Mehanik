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
import useCustomerStore from "@/stores/useCustomerStore";
import { Ionicons } from "@expo/vector-icons";

export default function EditCustomerScreen() {
  const { uuid } = useLocalSearchParams(); // Vehicle uuid
  const { updateCustomerVehicle } = useCustomer();
  const { customers } = useCustomerStore();

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
  }, [customers, uuid]);

  const handleSaveEdit = async () => {
    if (currentCustomer && currentVehicle) {
      var result = await updateCustomerVehicle(currentCustomer, currentVehicle);
    }
    if (!result) {
      Alert.alert(
        "Napaka",
        "Prišlo je do napake pri posodabljanju podatkov. Poskusite ponovno kasneje"
      );
    }
    router.replace("/(tabs-mechanic)/library");
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

  const resfreshData = () => {
    setCurrentCustomer(originalCustomer);
    setCurrentVehicle(originalVehicle);
  };

  return (
    <TemplateView
      title={"Uredi stranko"}
      buttonText={"Uredi"}
      onButtonPress={handleSaveEdit}
      menuIcon={<Ionicons name={"refresh"} size={30} onPress={resfreshData} />}
    >
      <View style={styles.container}>
        <ImageForm image={currentVehicle?.image} setImage={handleSaveImage} />
        <CustomerForm
          customer={currentCustomer}
          setCustomer={setCurrentCustomer}
        />
        <VehicleForm vehicle={currentVehicle} setVehicle={setCurrentVehicle} />
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
});
