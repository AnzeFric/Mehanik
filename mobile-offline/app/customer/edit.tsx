import { Alert } from "react-native";
import { useCallback, useMemo, useState } from "react";
import CustomerForm from "@/components/mechanic/library/forms/CustomerForm";
import TemplateView from "@/components/mechanic/library/TemplateView";
import { CustomerData, CustomerFormData } from "@/interfaces/customer";
import { VehicleData } from "@/interfaces/vehicle";
import VehicleForm from "@/components/mechanic/library/forms/VehicleForm";
import ImageForm from "@/components/mechanic/library/forms/ImageForm";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import useDataStore from "@/stores/useDataStore";

export default function EditCustomerScreen() {
  const { customerUuid } = useLocalSearchParams();

  const { customers, setCustomers } = useDataStore();

  const [currentCustomer, setCurrentCustomer] = useState<CustomerData>();
  const [currentVehicle, setCurrentVehicle] = useState<VehicleData>();
  const [currentImage, setCurrentImage] = useState<string | null>();

  const foundCustomer = useMemo(() => {
    return customers.find((item) => item.uuid === customerUuid.toString());
  }, [customers, customerUuid]);

  useFocusEffect(
    useCallback(() => {
      const foundCustomer = customers.find(
        (item) => item.uuid === customerUuid.toString()
      );

      if (foundCustomer) {
        setCurrentCustomer(foundCustomer.customer);
        setCurrentVehicle(foundCustomer.vehicle);
        setCurrentImage(foundCustomer.vehicle.image || "");
      }
    }, [customers, customerUuid])
  );

  const canSave: boolean = useMemo(() => {
    return Boolean(
      currentCustomer &&
        currentVehicle &&
        currentCustomer.firstName &&
        currentCustomer.lastName &&
        currentVehicle.brand &&
        currentVehicle.model
    );
  }, [currentCustomer, currentVehicle]);

  const handleSaveEdit = async () => {
    if (!canSave || !currentCustomer || !currentVehicle || !foundCustomer) {
      Alert.alert("Napaka", "Izpolniti morate vsa obvezna polja");
      return;
    }
    const updatedCustomer: CustomerFormData = {
      uuid: foundCustomer.uuid,
      customer: currentCustomer,
      vehicle: { ...currentVehicle, image: currentImage || null },
      repair: foundCustomer.repair || null,
    };
    const updatedCustomers = customers.map((customer) =>
      customer.uuid === foundCustomer.uuid ? updatedCustomer : customer
    );
    setCustomers(updatedCustomers);
    router.replace("/");
  };

  return (
    <TemplateView
      title={"Uredi stranko"}
      backButton={true}
      buttonText={"Uredi"}
      onButtonPress={handleSaveEdit}
    >
      <ImageForm image={currentImage} setImage={setCurrentImage} />
      <CustomerForm
        customer={currentCustomer}
        setCustomer={setCurrentCustomer}
      />
      <VehicleForm vehicle={currentVehicle} setVehicle={setCurrentVehicle} />
    </TemplateView>
  );
}
