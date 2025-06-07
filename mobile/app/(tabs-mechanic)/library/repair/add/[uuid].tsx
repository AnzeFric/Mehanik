import { Alert, StyleSheet, View } from "react-native";
import { useState } from "react";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { RepairData } from "@/interfaces/repair";
import { useRepair } from "@/hooks/useRepair";
import TemplateView from "@/components/mechanic/library/TemplateView";
import { router, useLocalSearchParams } from "expo-router";
import useCustomerStore from "@/stores/useCustomerStore";

export default function AddRepairScreen() {
  const { uuid } = useLocalSearchParams(); // Vehicle uuid
  const [repairData, setRepairData] = useState<RepairData | null>(null);
  const { saveVehicleRepairs } = useRepair();
  const { setShouldRefetch } = useCustomerStore();

  const handleSaveRepair = async () => {
    if (repairData) {
      const result = await saveVehicleRepairs(uuid.toString(), repairData);

      if (result) {
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
      buttonText={"Shrani"}
      onButtonPress={handleSaveRepair}
    >
      <View style={styles.container}>
        <RepairForm repair={null} setRepair={setRepairData} />
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
});
