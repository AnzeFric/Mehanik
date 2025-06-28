import { View, Alert } from "react-native";
import { useCallback, useMemo, useState } from "react";
import CustomerForm from "@/components/mechanic/library/forms/CustomerForm";
import TemplateView from "@/components/mechanic/library/TemplateView";
import { CustomerData } from "@/interfaces/customer";
import { VehicleData } from "@/interfaces/vehicle";
import VehicleForm from "@/components/mechanic/library/forms/VehicleForm";
import ImageForm from "@/components/mechanic/library/forms/ImageForm";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import useDataStore from "@/stores/useDataStore";

export default function EditCustomerScreen() {
  const { id } = useLocalSearchParams(); // Customer id

  const { customers } = useDataStore();

  const [currentCustomer, setCurrentCustomer] = useState<CustomerData>();
  const [currentVehicle, setCurrentVehicle] = useState<VehicleData>();
  const [currentImage, setCurrentImage] = useState<string | null>();

  useFocusEffect(
    useCallback(() => {
      const foundCustomerVehicle = customers.find(
        (item) => item.customer.id === parseInt(id.toString())
      );

      if (foundCustomerVehicle) {
        setCurrentCustomer(foundCustomerVehicle.customer);
        setCurrentVehicle(foundCustomerVehicle.vehicle);
        setCurrentImage(foundCustomerVehicle.vehicle.image || "");
      }
    }, [customers, id])
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
    console.log("Save edit");
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
