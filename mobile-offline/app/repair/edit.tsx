import { Alert } from "react-native";
import TemplateView from "@/components/mechanic/library/TemplateView";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import useDataStore from "@/stores/useDataStore";
import { useCallback, useMemo, useState } from "react";
import { RepairData } from "@/interfaces/repair";
import { useRepairs } from "@/hooks/useRepairs";
import { useCustomers } from "@/hooks/useCustomers";
import { useTranslation } from "react-i18next";

export default function EditRepairScreen() {
  const { customerUuid, repairUuid } = useLocalSearchParams();

  const { customers, setCustomers } = useDataStore();

  const { t } = useTranslation();
  const { editRepair } = useRepairs();
  const { fetchCustomers } = useCustomers();

  const [repair, setRepair] = useState<RepairData>();
  const [updating, setUpdating] = useState(false);

  const foundCustomer = useMemo(() => {
    return customers.find(
      (customer) => customer.customer.uuid === customerUuid.toString()
    );
  }, [customers, customerUuid]);

  const repairData = useMemo(() => {
    if (foundCustomer) {
      const foundRepair = foundCustomer.repairs?.find(
        (repair) => repair.uuid === repairUuid
      );

      if (foundRepair) {
        // Ensure date is a proper Date object
        return {
          ...foundRepair,
          date:
            foundRepair.repairDate instanceof Date
              ? foundRepair.repairDate
              : new Date(foundRepair.repairDate || Date.now()),
        };
      }
    }

    Alert.alert(
      t("screens.repairEdit.text.repairFetchFailTitle"),
      t("screens.repairEdit.text.repairFetchFailText")
    );
    router.back();
    return undefined;
  }, [foundCustomer, repairUuid]);

  useFocusEffect(
    useCallback(() => {
      if (repairData) {
        setRepair(repairData);
      }
    }, [repairData])
  );

  const handleEditRepair = async () => {
    if (repair) {
      setUpdating(true);
      const success = await editRepair(repair);
      if (success) {
        const newCustomers = await fetchCustomers();
        if (newCustomers) setCustomers(newCustomers);
      } else {
        Alert.alert(
          t("screens.repairEdit.text.repairEditFailTitle"),
          t("screens.repairEdit.text.repairEditFailText")
        );
      }
      setUpdating(false);
      router.back();
    }
  };

  return (
    <TemplateView
      title={t("screens.repairEdit.text.title")}
      backButton={true}
      buttonText={
        updating
          ? t("screens.repairEdit.text.editing")
          : t("screens.repairEdit.text.edit")
      }
      onButtonPress={handleEditRepair}
    >
      <RepairForm repair={repairData} setRepair={setRepair} />
    </TemplateView>
  );
}
