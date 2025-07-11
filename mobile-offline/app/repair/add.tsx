import { useState } from "react";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { RepairData } from "@/interfaces/repair";
import TemplateView from "@/components/mechanic/library/TemplateView";
import { router, useLocalSearchParams } from "expo-router";
import { useRepairs } from "@/hooks/useRepairs";
import { useCustomers } from "@/hooks/useCustomers";
import { Alert } from "react-native";
import useDataStore from "@/stores/useDataStore";

export default function AddRepairScreen() {
  const { customerUuid } = useLocalSearchParams();
  const { setCustomers } = useDataStore();

  const { addRepair } = useRepairs();
  const { fetchCustomers } = useCustomers();

  const [repairData, setRepairData] = useState<RepairData | null>(null);

  const handleSaveRepair = async () => {
    if (repairData) {
      const success = await addRepair(customerUuid.toString(), repairData);
      if (success) {
        const newCustomers = await fetchCustomers();
        if (newCustomers) setCustomers(newCustomers);
      } else {
        Alert.alert(
          "Napaka",
          "Prišlo je do napake pri shranjevanju servisa. Kliči Anžeta."
        );
      }
      router.back();
    }
  };

  return (
    <TemplateView
      title={"Shrani servis"}
      backButton={true}
      buttonText={"Shrani"}
      onButtonPress={handleSaveRepair}
    >
      <RepairForm repair={undefined} setRepair={setRepairData} />
    </TemplateView>
  );
}
