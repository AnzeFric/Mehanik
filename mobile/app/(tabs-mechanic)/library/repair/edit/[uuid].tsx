import { View, Alert } from "react-native";
import TemplateView from "@/components/mechanic/library/TemplateView";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { useEffect, useState } from "react";
import { RepairData } from "@/interfaces/repair";
import { router, useLocalSearchParams } from "expo-router";
import { useRepair } from "@/hooks/useRepair";
import useCustomerStore from "@/stores/useCustomerStore";
import ThemedIcon from "@/components/global/themed/ThemedIcon";

export default function EditRepairScreen() {
  const { uuid } = useLocalSearchParams(); // Vehicle uuid

  const { setShouldRefetch } = useCustomerStore();

  const [currentRepair, setCurrentRepair] = useState<RepairData | null>(null);
  const { currentRepairFocus, updateVehicleRepair } = useRepair();

  useEffect(() => {
    setCurrentRepair(currentRepairFocus);
  }, [uuid, currentRepairFocus]);

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

  const resfreshData = () => {
    setCurrentRepair(currentRepairFocus);
  };

  return (
    <TemplateView
      title={"Uredi servis"}
      backButton={true}
      buttonText={"Shrani"}
      onButtonPress={handleEditRepair}
      menuIcon={
        <ThemedIcon name={"refresh"} size={30} onPress={resfreshData} />
      }
    >
      <View style={{ paddingHorizontal: 25 }}>
        <RepairForm repair={currentRepair} setRepair={setCurrentRepair} />
      </View>
    </TemplateView>
  );
}
