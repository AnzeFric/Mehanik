import { StyleSheet } from "react-native";
import { useCallback } from "react";
import DisplayItems from "@/components/global/DisplayItems";
import Appointment from "@/components/mechanic/items/Appointment";
import TitleRow from "@/components/shared/TitleRow";
import ThemedView from "@/components/global/themed/ThemedView";
import { useAppointment } from "@/hooks/useAppointment";
import useAppointmentStore from "@/stores/useAppointmentStore";
import { useFocusEffect } from "expo-router";

export default function AppointmentsScreen() {
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
      <TitleRow title={"Novi termini"} hasBackButton={false} />
      <DisplayItems
        list={userAppointments}
        renderItem={(appointment, index) => (
          <Appointment appointmentData={appointment} key={index} />
        )}
        emptyMessage="Nimate novih terminov."
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
