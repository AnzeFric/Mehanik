import { Alert, View } from "react-native";
import { useState } from "react";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { RepairData } from "@/interfaces/repair";
import { useRepair } from "@/hooks/useRepair";
import TemplateView from "@/components/mechanic/library/TemplateView";
import { router, useLocalSearchParams } from "expo-router";
import useCustomerStore from "@/stores/accounts/useCustomerStore";

export default function AddRepairScreen() {
  const { uuid } = useLocalSearchParams(); // Vehicle uuid

  const { setShouldRefetch } = useCustomerStore();
  const { saveVehicleRepairs } = useRepair();

  const [repairData, setRepairData] = useState<RepairData | null>(null);

  const handleSaveRepair = async () => {
    if (repairData) {
      const success = await saveVehicleRepairs(uuid.toString(), repairData);

      if (success) {
        setShouldRefetch(true);
      } else {
        Alert.alert(
          "Napaka",
          "Prišlo je do napake pri posodabljanju podatkov. Poskusite ponovno kasneje"
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
      <View style={{ paddingHorizontal: 25 }}>
        <RepairForm repair={null} setRepair={setRepairData} />
      </View>
    </TemplateView>
  );
}
