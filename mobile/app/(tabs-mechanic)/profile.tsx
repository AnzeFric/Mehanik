import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import TemplateView from "@/components/mechanic/library/TemplateView";
import MechanicForm from "@/components/mechanic/library/forms/mechanic/MechanicForm";
import { MechanicData } from "@/interfaces/user";
import useMechanicStore from "@/stores/useMechanicStore";

export default function MechanicProfileScreen() {
  const { currentMechanic } = useMechanicStore();
  const [mechanic, setMechanic] = useState<MechanicData | null>(null);

  useEffect(() => {
    setMechanic(currentMechanic);
  }, [currentMechanic]);

  const handleSaveEdit = () => {};

  return (
    <TemplateView
      title={"Uredi profil"}
      buttonText={"Uredi"}
      backButton={false}
      onButtonPress={handleSaveEdit}
    >
      <View style={styles.container}>
        <MechanicForm mechanic={currentMechanic} setMechanic={setMechanic} />
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
});
