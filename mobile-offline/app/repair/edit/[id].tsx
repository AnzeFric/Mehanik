import { View } from "react-native";
import TemplateView from "@/components/mechanic/library/TemplateView";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { useCallback, useState } from "react";
import { RepairData } from "@/interfaces/repair";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import useDataStore from "@/stores/useDataStore";

export default function EditRepairScreen() {
  const { id } = useLocalSearchParams(); // Customer id

  const { customers } = useDataStore();

  const handleEditRepair = async () => {
    // TODO: Update
    router.replace(`/(tabs)`);
  };

  return (
    <TemplateView
      title={"Uredi servis"}
      backButton={true}
      buttonText={"Shrani"}
      onButtonPress={handleEditRepair}
    >
      <View style={{ paddingHorizontal: 25 }}>
        <RepairForm repair={null} setRepair={() => {}} />
      </View>
    </TemplateView>
  );
}
