import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import DaySchedule from "@/components/mechanic/home/DaySchedule";
import { useLocalSearchParams } from "expo-router";
import ThemedView from "@/components/global/themed/ThemedView";
import TitleRow from "@/components/shared/TitleRow";
import { useAppointment } from "@/hooks/useAppointment";
import { UserAppointmentData } from "@/interfaces/appointment";

export default function AppointmentScreen() {
  const { email } = useLocalSearchParams();
  const { getUserAppointments } = useAppointment();

  const [appointments, setAppointments] = useState<Array<UserAppointmentData>>(
    []
  );

  const appointmentsFetch = async () => {
    const fetchedAppointments = await getUserAppointments(email.toString());
    setAppointments(fetchedAppointments);
  };

  useEffect(() => {
    appointmentsFetch();
  }, [email]);

  return (
    <ThemedView type={"background"} style={styles.container}>
      <TitleRow title={"Pregled terminov"} hasBackButton={true} />
      <View style={styles.contentContainer}>
        <DaySchedule
          appointments={appointments}
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
