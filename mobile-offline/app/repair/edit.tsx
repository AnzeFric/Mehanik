import { Alert } from "react-native";
import TemplateView from "@/components/mechanic/library/TemplateView";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import useDataStore from "@/stores/useDataStore";
import { useCallback, useMemo, useState } from "react";
import { CustomerFormData } from "@/interfaces/customer";
import { RepairData } from "@/interfaces/repair";

export default function EditRepairScreen() {
  const { customerUuid, repairUuid } = useLocalSearchParams();
  const { customers, setCustomers } = useDataStore();

  const [repair, setRepair] = useState<RepairData | null>(null);

  const repairData = useMemo(() => {
    const foundCustomer: CustomerFormData | undefined = customers.find(
      (customer) => customer.uuid === customerUuid.toString()
    );

    if (foundCustomer) {
      const foundRepair = foundCustomer.repair?.find(
        (repair) => repair.uuid === repairUuid
      );

      if (foundRepair) {
        // Ensure date is a proper Date object
        return {
          ...foundRepair,
          date:
            foundRepair.date instanceof Date
              ? foundRepair.date
              : new Date(foundRepair.date || Date.now()),
        };
      }
    }

    Alert.alert("Napaka", "Servisa ni bilo mogoče najti");
    router.back();
    return null;
  }, [customers, customerUuid, repairUuid]);

  useFocusEffect(
    useCallback(() => {
      if (repairData) {
        setRepair(repairData);
      }
    }, [repairData])
  );

  const handleEditRepair = async () => {
    if (repair) {
      const updatedCustomers: Array<CustomerFormData> = customers.map(
        (customer) => {
          if (customer.uuid === customerUuid.toString()) {
            return {
              ...customer,
              repair: customer.repair?.map((existingRepair) =>
                existingRepair.uuid === repairUuid ? repair : existingRepair
              ) || [repair],
            };
          }
          return customer;
        }
      );
      setCustomers(updatedCustomers);
      router.back();
    }
  };

  return (
    <TemplateView
      title={"Uredi servis"}
      backButton={true}
      buttonText={"Shrani"}
      onButtonPress={handleEditRepair}
    >
      <RepairForm repair={repairData} setRepair={setRepair} />
    </TemplateView>
  );
}
