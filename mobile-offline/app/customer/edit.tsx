import { Alert } from "react-native";
import { useCallback, useMemo, useState } from "react";
import CustomerForm from "@/components/mechanic/library/forms/CustomerForm";
import TemplateView from "@/components/mechanic/library/TemplateView";
import { CustomerData } from "@/interfaces/customer";
import { VehicleData } from "@/interfaces/vehicle";
import VehicleForm from "@/components/mechanic/library/forms/VehicleForm";
import ImageForm from "@/components/mechanic/library/forms/ImageForm";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import useDataStore from "@/stores/useDataStore";
import { useCustomers } from "@/hooks/useCustomers";

export default function EditCustomerScreen() {
  const { customerUuid } = useLocalSearchParams();
  const { updateCustomer, fetchCustomers } = useCustomers();
  const { customers, setCustomers } = useDataStore();

  const [currentCustomer, setCurrentCustomer] = useState<CustomerData>();
  const [currentVehicle, setCurrentVehicle] = useState<VehicleData>();
  const [currentImage, setCurrentImage] = useState<string | null>();
  const [updating, setUpdating] = useState(false);

  const foundCustomer = useMemo(() => {
    return customers.find(
      (customer) => customer.customer.uuid === customerUuid.toString()
    );
  }, [customers, customerUuid]);

  useFocusEffect(
    useCallback(() => {
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
    setUpdating(true);

    const updatedCustomer: CustomerData = {
      ...currentCustomer,
      uuid: currentCustomer.uuid,
    };
    const updatedVehicle: VehicleData = {
      ...currentVehicle,
      image: currentImage || null,
    };

    const success = await updateCustomer(
      customerUuid.toString(),
      updatedCustomer,
      updatedVehicle
    );

    if (success) {
      const newCustomers = await fetchCustomers();
      if (newCustomers) setCustomers(newCustomers);
    } else {
      Alert.alert(
        "Napaka",
        "Prišlo je do napake pri posodabljanju stranke. Kliči Anžeta."
      );
    }

    setUpdating(false);
    router.replace("/");
  };

  return (
    <TemplateView
      title={"Uredi stranko"}
      backButton={true}
      buttonText={updating ? "Urejanje..." : "Uredi"}
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
