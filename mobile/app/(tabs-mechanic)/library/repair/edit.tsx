import { View, Alert } from "react-native";
import TemplateView from "@/components/mechanic/library/TemplateView";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { useCallback, useState } from "react";
import { RepairData } from "@/interfaces/repair";
import { router, useFocusEffect } from "expo-router";
import { useRepair } from "@/hooks/useRepair";
import useCustomerStore from "@/stores/accounts/useCustomerStore";
import useRepairStore from "@/stores/useRepairStore";

export default function EditRepairScreen() {
  const { setShouldRefetch } = useCustomerStore();
  const { updateVehicleRepair } = useRepair();
  const { currentRepairFocus, setCurrentRepairFocus } = useRepairStore();

  const [repair, setRepair] = useState<RepairData | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (currentRepairFocus) {
        setRepair(currentRepairFocus);
      }
    }, [currentRepairFocus])
  );

  const handleEditRepair = async () => {
    if (repair) {
      const result = await updateVehicleRepair(repair);

      if (result) {
        setShouldRefetch(true);
      } else {
        Alert.alert(
          "Napaka",
          "Prišlo je do napake pri posodabljanju podatkov. Poskusite ponovno kasneje"
        );
      }
    }
    setCurrentRepairFocus(null);
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
        <RepairForm repair={repair} setRepair={setRepair} />
      </View>
    </TemplateView>
  );
}
