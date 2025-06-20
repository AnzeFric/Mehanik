import { View, StyleSheet } from "react-native";
import DaySchedule from "@/components/mechanic/home/DaySchedule";
import { router, useFocusEffect } from "expo-router";
import TitleRow from "@/components/shared/TitleRow";
import ThemedIcon from "@/components/global/themed/ThemedIcon";
import ThemedView from "@/components/global/themed/ThemedView";
import useAppointmentStore from "@/stores/useAppointmentStore";
import { useAppointment } from "@/hooks/useAppointment";
import { useCallback, useEffect } from "react";

export default function HomeMechanicScreen() {
  const {
    shouldRefetch,
    getUserAppointments,
    setUserAppointments,
    setShouldRefetch,
  } = useAppointmentStore();

  const { getMechanicAppointments } = useAppointment();

  const appointmentsFetch = async () => {
    const fetchedAppointments = await getMechanicAppointments();
    setUserAppointments(fetchedAppointments);
  };

  useEffect(() => {
    appointmentsFetch();
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (shouldRefetch) {
          appointmentsFetch();
          setShouldRefetch(false);
        }
      };
    }, [])
  );

  return (
    <ThemedView type={"background"} style={styles.container}>
      <TitleRow
        title={"Pregled terminov"}
        hasBackButton={false}
        menuButton={
          <ThemedIcon
            name={"menu"}
            size={30}
            onPress={() => {
              router.push("/(shared)/settings");
            }}
          />
        }
      />
      <View style={styles.contentContainer}>
        <DaySchedule
          appointments={getUserAppointments(["accepted", "hidden"])}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 10,
    paddingTop: 15,
    flex: 1,
  },
});
