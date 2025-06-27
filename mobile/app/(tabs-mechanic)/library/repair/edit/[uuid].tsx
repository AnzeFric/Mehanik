import { View, Alert } from "react-native";
import TemplateView from "@/components/mechanic/library/TemplateView";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { useCallback, useState } from "react";
import { RepairData } from "@/interfaces/repair";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useRepair } from "@/hooks/useRepair";
import useCustomerStore from "@/stores/accounts/useCustomerStore";

export default function EditRepairScreen() {
  const { uuid } = useLocalSearchParams(); // Vehicle uuid

  const { setShouldRefetch } = useCustomerStore();
  const { currentRepairFocus, updateVehicleRepair } = useRepair();

  const [currentRepair, setCurrentRepair] = useState<RepairData | null>(null);

  useFocusEffect(
    useCallback(() => {
      setCurrentRepair(currentRepairFocus);
    }, [uuid, currentRepairFocus])
  );

  const handleEditRepair = async () => {
    if (currentRepair) {
      const result = await updateVehicleRepair(currentRepair);

      if (result) {
        setShouldRefetch(true);
      } else {
        Alert.alert(
          "Napaka",
          "Prišlo je do napake pri posodabljanju podatkov. Poskusite ponovno kasneje"
        );
      }
    }
    router.replace(`/(tabs-mechanic)/library`);
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
