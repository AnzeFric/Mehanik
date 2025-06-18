import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import DisplayItems from "@/components/global/DisplayItems";
import Appointment from "@/components/mechanic/items/Appointment";
import TitleRow from "@/components/shared/TitleRow";
import ThemedView from "@/components/global/themed/ThemedView";
import { UserAppointmentData } from "@/interfaces/appointment";
import { useAppointment } from "@/hooks/useAppointment";

export default function AppointmentsScreen() {
  const { getAppointments } = useAppointment();
  const [appointmentList, setAppointmentList] = useState<
    Array<UserAppointmentData>
  >([]);

  const appointmentsFetch = async () => {
    const fetchedAppointments = await getAppointments();
    setAppointmentList(fetchedAppointments);
  };

  useEffect(() => {
    appointmentsFetch();
  }, []);

  return (
    <ThemedView type={"background"} style={styles.container}>
      <TitleRow title={"Novi termini"} hasBackButton={false} />
      <DisplayItems
        list={appointmentList}
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
