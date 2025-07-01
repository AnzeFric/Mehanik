import { useState } from "react";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { RepairData } from "@/interfaces/repair";
import TemplateView from "@/components/mechanic/library/TemplateView";
import { router, useLocalSearchParams } from "expo-router";
import useDataStore from "@/stores/useDataStore";
import { CustomerFormData } from "@/interfaces/customer";
import uuid from "react-native-uuid";

export default function AddRepairScreen() {
  const { customerUuid } = useLocalSearchParams();

  const { customers, setCustomers } = useDataStore();

  const [repairData, setRepairData] = useState<RepairData | null>(null);

  const handleSaveRepair = async () => {
    if (repairData) {
      const newRepair: RepairData = {
        ...repairData,
        uuid: uuid.v4(),
      };
      const updatedCustomers: Array<CustomerFormData> = customers.map(
        (customer) =>
          customer.uuid === customerUuid.toString()
            ? {
                ...customer,
                repair: customer.repair
                  ? [...customer.repair, newRepair]
                  : [newRepair],
              }
            : customer
      );
      setCustomers(updatedCustomers);
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
      <RepairForm repair={null} setRepair={setRepairData} />
    </TemplateView>
  );
}
