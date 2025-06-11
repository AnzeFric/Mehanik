import { StyleSheet, ScrollView } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import MechanicForm from "@/components/mechanic/library/forms/mechanic/MechanicForm";
import { MechanicData } from "@/interfaces/user";
import useUserStore from "@/stores/useUserStore";
import { useUser } from "@/hooks/useUser";
import TitleRow from "@/components/shared/TitleRow";
import { useFocusEffect } from "expo-router";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedButton from "@/components/global/themed/ThemedButton";

export default function MechanicProfileScreen() {
  const { currentUser } = useUserStore();
  const { updateUser } = useUser();
  const [mechanic, setMechanic] = useState<MechanicData>(currentUser);
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setMechanic(currentUser);
  }, [currentUser]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ y: 0 });
          }
        }, 100); // For smooth transition between screens
      };
    }, [])
  );

  const handleSaveEdit = async () => {
    if (!mechanic) {
      return;
    }
    setIsLoading(true);
    await updateUser(mechanic);
    setIsLoading(false);
  };

  return (
    <ThemedView type={"background"} style={styles.container}>
      <TitleRow title={"Uredi profil"} hasBackButton={true} />
      <ScrollView
        style={styles.childrenContainer}
        ref={scrollRef}
        keyboardShouldPersistTaps={"handled"}
      >
        <MechanicForm mechanic={mechanic} setMechanic={setMechanic} />
        <ThemedButton
          buttonType={"small"}
          onPress={handleSaveEdit}
          buttonText={isLoading ? "Posodabljam..." : "Uredi"}
          buttonStyle={{ marginBottom: 25 }}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  childrenContainer: {
    flex: 1,
    paddingHorizontal: 25,
  },
});
