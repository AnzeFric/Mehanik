import { View } from "react-native";
import { useState } from "react";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { RepairData } from "@/interfaces/repair";
import TemplateView from "@/components/mechanic/library/TemplateView";
import { router, useLocalSearchParams } from "expo-router";
import useDataStore from "@/stores/useDataStore";

export default function AddRepairScreen() {
  const { uuid } = useLocalSearchParams(); // Vehicle uuid

  const [repairData, setRepairData] = useState<RepairData | null>(null);

  const handleSaveRepair = async () => {
    // TODO: Save
    router.back();
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
