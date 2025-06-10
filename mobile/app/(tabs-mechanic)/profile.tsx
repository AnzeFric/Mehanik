import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import TemplateView from "@/components/mechanic/library/TemplateView";
import MechanicForm from "@/components/mechanic/library/forms/mechanic/MechanicForm";
import { MechanicData } from "@/interfaces/user";
import useUserStore from "@/stores/useUserStore";
import { useUser } from "@/hooks/useUser";

export default function MechanicProfileScreen() {
  const { currentUser } = useUserStore();
  const { updateUser } = useUser();
  const [mechanic, setMechanic] = useState<MechanicData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMechanic(currentUser);
  }, [currentUser]);

  const handleSaveEdit = async () => {
    if (!mechanic) {
      return;
    }
    setIsLoading(true);
    await updateUser(mechanic);
    setIsLoading(false);
  };

  return (
    <TemplateView
      title={"Uredi profil"}
      buttonText={isLoading ? "Posodabljam..." : "Uredi"}
      backButton={false}
      onButtonPress={handleSaveEdit}
    >
      <View style={styles.container}>
        <MechanicForm mechanic={currentUser} setMechanic={setMechanic} />
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
});
