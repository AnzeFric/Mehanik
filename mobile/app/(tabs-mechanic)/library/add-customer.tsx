import { router } from "expo-router";
import TemplateView from "@/components/mechanic/library/TemplateView";
import CustomerForm from "@/components/mechanic/library/customer-form/CustomerForm";
import { useCustomer } from "@/hooks/useCustomer";
import { CustomerData, VehicleData } from "@/interfaces/customer";
import { RepairData } from "@/interfaces/repair";

export default function AddCustomerScreen() {
  const { saveCustomer } = useCustomer();

  const handlePress = (
    customerData: CustomerData,
    vehicleData: VehicleData,
    repairData: RepairData
  ) => {
    saveCustomer(customerData, vehicleData, repairData);
    router.push(`/(tabs-mechanic)/library`);
  };

  return (
    <TemplateView
      title={"Dodaj stranko"}
      buttonText={"Dodaj"}
      onButtonPress={handlePress}
    >
      <CustomerForm />
    </TemplateView>
  );
}
