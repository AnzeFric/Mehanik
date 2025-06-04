import { StyleSheet, View } from "react-native";
import { useState } from "react";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { RepairData } from "@/interfaces/repair";
import { useRepair } from "@/hooks/useRepair";
import TemplateView from "@/components/mechanic/library/TemplateView";
import { router, useLocalSearchParams } from "expo-router";

export default function AddRepairScreen() {
  const { uuid } = useLocalSearchParams(); // Vehicle uuid
  const [repairData, setRepairData] = useState<RepairData | null>(null);
  const { saveVehicleRepairs } = useRepair();

  const handleSaveRepair = () => {
    if (repairData) {
      saveVehicleRepairs(uuid.toString(), repairData);
      router.back();
    }
  };

  return (
    <TemplateView
      title={"Pregled terminov"}
      buttonText={"Shrani"}
      onButtonPress={handleSaveRepair}
    >
      <View style={styles.container}>
        <RepairForm setRepair={setRepairData} />
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
});
