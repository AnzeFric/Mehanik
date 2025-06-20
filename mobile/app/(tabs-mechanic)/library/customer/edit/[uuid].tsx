import { View, Alert } from "react-native";
import { useCallback, useState } from "react";
import CustomerForm from "@/components/mechanic/library/forms/CustomerForm";
import TemplateView from "@/components/mechanic/library/TemplateView";
import { CustomerData } from "@/interfaces/customer";
import { VehicleData } from "@/interfaces/vehicle";
import VehicleForm from "@/components/mechanic/library/forms/VehicleForm";
import ImageForm from "@/components/mechanic/library/forms/ImageForm";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCustomer } from "@/hooks/accounts/useCustomer";
import useCustomerStore from "@/stores/accounts/useCustomerStore";

export default function EditCustomerScreen() {
  const { uuid } = useLocalSearchParams(); // Vehicle uuid
  const { updateCustomerVehicle } = useCustomer();
  const { customers } = useCustomerStore();

  const [currentCustomer, setCurrentCustomer] = useState<CustomerData>();
  const [currentVehicle, setCurrentVehicle] = useState<VehicleData>();
  const [currentImage, setCurrentImage] = useState<string | null>();

  useFocusEffect(
    useCallback(() => {
      const foundCustomerVehicle = customers.find(
        (item) => item.vehicle.uuid === uuid
      );

      if (foundCustomerVehicle) {
        setCurrentCustomer(foundCustomerVehicle.customer);
        setCurrentVehicle(foundCustomerVehicle.vehicle);
        setCurrentImage(foundCustomerVehicle.vehicle.image || "");
      }
    }, [customers, uuid])
  );

  const handleSaveEdit = async () => {
    if (currentCustomer && currentVehicle) {
      const finalVehicleData = {
        ...currentVehicle,
        image: currentImage || null,
      };

      var result = await updateCustomerVehicle(
        currentCustomer,
        finalVehicleData
      );

      if (!result) {
        Alert.alert(
          "Napaka",
          "Prišlo je do napake pri posodabljanju podatkov. Poskusite ponovno kasneje"
        );
      }
      router.replace("/(tabs-mechanic)/library");
    }
  };

  return (
    <TemplateView
      title={"Uredi stranko"}
      backButton={true}
      buttonText={"Uredi"}
      onButtonPress={handleSaveEdit}
    >
      <View style={{ paddingHorizontal: 25 }}>
        <ImageForm image={currentImage} setImage={setCurrentImage} />
        <CustomerForm
          customer={currentCustomer}
          setCustomer={setCurrentCustomer}
        />
        <VehicleForm vehicle={currentVehicle} setVehicle={setCurrentVehicle} />
      </View>
    </TemplateView>
  );
}
