import { View } from "react-native";
import TemplateView from "@/components/mechanic/library/TemplateView";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { useCallback, useState } from "react";
import { RepairData } from "@/interfaces/repair";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import useCustomerStore from "@/stores/accounts/useCustomerStore";
import useRepairStore from "@/stores/useRepairStore";

export default function EditRepairScreen() {
  const { uuid } = useLocalSearchParams(); // Vehicle uuid

  const { setShouldRefetch } = useCustomerStore();
  const { currentRepairFocus } = useRepairStore();

  const [currentRepair, setCurrentRepair] = useState<RepairData | null>(null);

  useFocusEffect(
    useCallback(() => {
      setCurrentRepair(currentRepairFocus);
    }, [uuid, currentRepairFocus])
  );

  const handleEditRepair = async () => {
    if (currentRepair) {
      // TODO: Update

      setShouldRefetch(true);
    }
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
        <RepairForm repair={currentRepair} setRepair={setCurrentRepair} />
      </View>
    </TemplateView>
  );
}
