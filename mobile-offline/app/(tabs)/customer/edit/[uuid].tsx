import { View, Alert } from "react-native";
import { useCallback, useMemo, useState } from "react";
import CustomerForm from "@/components/mechanic/library/forms/CustomerForm";
import TemplateView from "@/components/mechanic/library/TemplateView";
import { CustomerData } from "@/interfaces/customer";
import { VehicleData } from "@/interfaces/vehicle";
import VehicleForm from "@/components/mechanic/library/forms/VehicleForm";
import ImageForm from "@/components/mechanic/library/forms/ImageForm";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import useCustomerStore from "@/stores/accounts/useCustomerStore";

export default function EditCustomerScreen() {
  const { uuid } = useLocalSearchParams(); // Vehicle uuid

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

  const canSave: boolean = useMemo(() => {
    return Boolean(
      currentCustomer &&
        currentVehicle &&
        currentCustomer.firstName &&
        currentCustomer.lastName &&
        currentVehicle.brand &&
        currentVehicle.model &&
        currentVehicle.vin
    );
  }, [currentCustomer, currentVehicle]);

  const handleSaveEdit = async () => {
    if (!canSave || !currentCustomer || !currentVehicle) {
      Alert.alert("Napaka", "Izpolniti morate vsa obvezna polja");
      return;
    }

    const finalVehicleData = {
      ...currentVehicle,
      image: currentImage || null,
    };

    // TODO: Update

    router.replace("/(tabs)");
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
