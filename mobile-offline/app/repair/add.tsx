import { useState } from "react";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { RepairData } from "@/interfaces/repair";
import TemplateView from "@/components/mechanic/library/TemplateView";
import { router, useLocalSearchParams } from "expo-router";
import { useRepairs } from "@/hooks/useRepairs";
import { useCustomers } from "@/hooks/useCustomers";
import { Alert } from "react-native";
import useDataStore from "@/stores/useDataStore";
import { useTranslation } from "react-i18next";

export default function AddRepairScreen() {
  const { customerUuid } = useLocalSearchParams();
  const { setCustomers } = useDataStore();

  const { t } = useTranslation();
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
          t("screens.repairAdd.text.repairSaveFailTitle"),
          t("screens.repairAdd.text.repairSaveFailText")
        );
      }
      router.back();
    }
  };

  return (
    <TemplateView
      title={t("screens.repairAdd.text.title")}
      backButton={true}
      buttonText={t("screens.repairAdd.text.save")}
      onButtonPress={handleSaveRepair}
    >
      <RepairForm repair={undefined} setRepair={setRepairData} />
    </TemplateView>
  );
}
