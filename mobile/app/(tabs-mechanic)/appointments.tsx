import { StyleSheet } from "react-native";
import { useCallback } from "react";
import DisplayItems from "@/components/global/DisplayItems";
import Appointment from "@/components/mechanic/items/Appointment";
import TitleRow from "@/components/global/TitleRow";
import ThemedView from "@/components/global/themed/ThemedView";
import { useAppointment } from "@/hooks/useAppointment";
import useAppointmentStore from "@/stores/useAppointmentStore";
import { useFocusEffect } from "expo-router";

export default function AppointmentsScreen() {
  const {
    shouldRefetch,
    setUserAppointments,
    setShouldRefetch,
    getUserAppointments,
  } = useAppointmentStore();

  const { getMechanicAppointments } = useAppointment();

  const appointmentsFetch = async () => {
    const fetchedAppointments = await getMechanicAppointments();
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
        list={getUserAppointments(["pending"])}
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
