import { View } from "react-native";
import TemplateView from "@/components/mechanic/library/TemplateView";
import RepairForm from "@/components/mechanic/library/forms/RepairForm";
import { useLocalSearchParams } from "expo-router";

export default function EditRepairScreen() {
  const { id } = useLocalSearchParams(); // Customer id

  const handleEditRepair = async () => {
    // TODO: Update
    console.log("Edit repair");
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
