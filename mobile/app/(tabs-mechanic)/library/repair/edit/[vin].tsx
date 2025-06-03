import { View, StyleSheet } from "react-native";
import TemplateView from "@/components/mechanic/library/TemplateView";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { useState } from "react";
import { RepairData } from "@/interfaces/repair";

export default function EditRepairScreen() {
  const [repairData, setRepairData] = useState<RepairData | null>();

  const handleEditRepair = () => {};

  return (
    <TemplateView
      title={"Pregled terminov"}
      buttonText={"Shrani"}
      onButtonPress={handleEditRepair}
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
