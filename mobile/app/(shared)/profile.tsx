import { StyleSheet, ScrollView, Alert } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import MechanicForm from "@/components/mechanic/library/forms/mechanic/MechanicForm";
import { MechanicData } from "@/interfaces/user";
import useUserStore from "@/stores/accounts/useUserStore";
import { useUser } from "@/hooks/accounts/useUser";
import TitleRow from "@/components/global/TitleRow";
import { useFocusEffect } from "expo-router";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedButton from "@/components/global/themed/ThemedButton";
import ImageForm from "@/components/mechanic/library/forms/ImageForm";

export default function MechanicProfileScreen() {
  const { currentUser } = useUserStore();
  const { updateUser } = useUser();

  const [mechanic, setMechanic] = useState<MechanicData>(currentUser);
  const [image, setImage] = useState<string | null>(currentUser.info.image);
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setMechanic(currentUser);
  }, [currentUser]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ y: 0 });
        }
      };
    }, [])
  );

  const handleSaveEdit = async () => {
    if (!mechanic) {
      return;
    }
    setIsLoading(true);

    const newMechanicData: MechanicData = {
      ...mechanic,
      info: {
        ...mechanic.info,
        image: image,
      },
    };
    const success = await updateUser(newMechanicData);

    if (!success) {
      Alert.alert(
        "Napaka!",
        "Napaka pri posodabljanju podatkov. Prosimo poskusite kasneje."
      );
    }
    setIsLoading(false);
  };

  return (
    <ThemedView type={"background"} style={styles.container}>
      <TitleRow title={"Uredi profil"} hasBackButton={true} />
      <ScrollView
        style={styles.childrenContainer}
        ref={scrollRef}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{ gap: 20 }}
      >
        <ImageForm image={mechanic.info.image} setImage={setImage} />
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
