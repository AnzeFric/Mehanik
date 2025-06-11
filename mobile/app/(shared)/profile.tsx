import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import MechanicForm from "@/components/mechanic/library/forms/mechanic/MechanicForm";
import { MechanicData } from "@/interfaces/user";
import useUserStore from "@/stores/useUserStore";
import { useUser } from "@/hooks/useUser";
import { AppStyles } from "@/constants/Styles";
import TitleRow from "@/components/shared/TitleRow";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "expo-router";
import ThemedView from "@/components/global/themed/ThemedView";

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
        <View style={styles.container}>
          <MechanicForm mechanic={mechanic} setMechanic={setMechanic} />
        </View>
        <TouchableOpacity
          style={[AppStyles.button, styles.button]}
          onPress={handleSaveEdit}
        >
          <Text style={AppStyles.buttonText}>
            {isLoading ? "Posodabljam..." : "Uredi"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    borderBottomColor: Colors.light.inactiveBorder,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "dashed",
    paddingTop: 20,
    marginHorizontal: 25,
  },
  userName: {
    fontSize: 32,
    flex: 1,
    textAlign: "center",
  },
  childrenContainer: {
    flex: 1,
    paddingHorizontal: 25,
  },
  button: {
    marginBottom: 25,
  },
});
