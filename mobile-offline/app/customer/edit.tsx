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
    return customers.find(
      (customer) => customer.customer.uuid === customerUuid.toString()
    );
  }, [customers, customerUuid]);

  useFocusEffect(
    useCallback(() => {
      const foundCustomer = customers.find(
        (customer) => customer.customer.uuid === customerUuid.toString()
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
      customer: { ...currentCustomer, uuid: currentCustomer.uuid },
      vehicle: { ...currentVehicle, image: currentImage || null },
      repairs: foundCustomer.repairs || undefined,
    };
    const updatedCustomers = customers.map((customer) =>
      customer.customer.uuid === foundCustomer.customer.uuid
        ? updatedCustomer
        : customer
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
