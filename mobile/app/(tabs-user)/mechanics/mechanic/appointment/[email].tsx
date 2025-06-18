import { View, StyleSheet } from "react-native";
import { useCallback, useEffect } from "react";
import DaySchedule from "@/components/mechanic/home/DaySchedule";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import ThemedView from "@/components/global/themed/ThemedView";
import TitleRow from "@/components/shared/TitleRow";
import useAppointmentStore from "@/stores/useAppointmentStore";
import { useAppointment } from "@/hooks/useAppointment";

export default function AppointmentScreen() {
  const { email } = useLocalSearchParams();

  const {
    userAppointments,
    shouldRefetch,
    setUserAppointments,
    setShouldRefetch,
  } = useAppointmentStore();

  const { getAppointments } = useAppointment();

  const appointmentsFetch = async () => {
    const fetchedAppointments = await getAppointments();
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
      <TitleRow title={"Pregled terminov"} hasBackButton={true} />
      <View style={styles.contentContainer}>
        <DaySchedule
          appointments={userAppointments}
          mechanicEmail={email.toString()}
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
    paddingTop: 15,
    flex: 1,
  },
});
