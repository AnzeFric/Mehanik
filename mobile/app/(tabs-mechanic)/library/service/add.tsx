import { StyleSheet } from "react-native";
import { useState } from "react";
import RepairForm from "@/components/mechanic/library/customer-form/components/forms2/RepairForm";
import { RepairData } from "@/interfaces/repair";
import { useRepair } from "@/hooks/useRepair";
import TemplateView from "@/components/mechanic/library/TemplateView";
import { router } from "expo-router";

export default function AddServiceScreen() {
  const [repairData, setRepairData] = useState<RepairData | null>(null);
  const { currentRepairFocus, saveVehicleRepairs } = useRepair();

  const handleSaveRepair = () => {
    if (repairData && currentRepairFocus) {
      saveVehicleRepairs(currentRepairFocus?.vehicleVin, repairData);
      router.back();
    }
  };

  return (
    <TemplateView
      title={"Pregled terminov"}
      buttonText={"Shrani"}
      onButtonPress={handleSaveRepair}
    >
      <RepairForm setRepair={setRepairData} />
    </TemplateView>
  );
}

const styles = StyleSheet.create({});
