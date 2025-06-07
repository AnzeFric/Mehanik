import { View, StyleSheet, Alert } from "react-native";
import TemplateView from "@/components/mechanic/library/TemplateView";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { useEffect, useState } from "react";
import { RepairData } from "@/interfaces/repair";
import { router, useLocalSearchParams } from "expo-router";
import { useRepair } from "@/hooks/useRepair";
import useCustomerStore from "@/stores/useCustomerStore";

export default function EditRepairScreen() {
  const { uuid } = useLocalSearchParams(); // Vehicle uuid
  const [currentRepair, setCurrentRepair] = useState<RepairData | null>(null);
  const { currentRepairFocus, updateVehicleRepair } = useRepair();
  const { setShouldRefetch } = useCustomerStore();

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

  return (
    <TemplateView
      title={"Uredi servis"}
      buttonText={"Shrani"}
      onButtonPress={handleEditRepair}
    >
      <View style={styles.container}>
        <RepairForm repair={currentRepairFocus} setRepair={setCurrentRepair} />
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
});
