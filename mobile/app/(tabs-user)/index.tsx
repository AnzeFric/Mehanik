import { StyleSheet, ScrollView } from "react-native";
import { useState, useRef, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import Appointment from "@/components/user/items/Appointment";
import TitleRow from "@/components/shared/TitleRow";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedIcon from "@/components/global/themed/ThemedIcon";
import ModalAppointment from "@/components/shared/modals/ModalAppointment";
import ModalPrompt from "@/components/shared/modals/ModalPrompt";
import { MechanicAppointmentData } from "@/interfaces/appointment";

const fakeAppointmentData: MechanicAppointmentData[] = [
  {
    uuid: "asdasd",
    startDate: new Date(2025, 6, 16, 12, 0, 0),
    endDate: new Date(2025, 6, 16, 14, 0, 0),
    status: "accepted",
    mechanicResponse: "pridi 10min prej",
    mechanic: {
      firstName: "Matej",
      lastName: "Kovac",
      email: "matej.kovac@mehanik.sem.si",
      address: "lublanska cesta 31",
      city: "Ptuj",
      phone: "031-123-123",
    },
  },
];

export default function HomeUserScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<MechanicAppointmentData | null>(null);

  const scrollRef = useRef<ScrollView>(null);

  // TODO: post to backend and get all appointments as the loggined user id
  const [appointmentList, setAppointmentList] =
    useState<Array<MechanicAppointmentData>>(fakeAppointmentData);

  const handleAppointmentPress = (appointment: MechanicAppointmentData) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const handleModalConfirm = () => {
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ y: 0 });
        }
      };
    }, [])
  );

  return (
    <ThemedView type={"background"} style={{ flex: 1 }}>
      <TitleRow
        title={"Termini"}
        hasBackButton={false}
        style={{ paddingBottom: 20 }}
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
      <ScrollView
        style={styles.container}
        ref={scrollRef}
        contentContainerStyle={styles.contentContainer}
      >
        {appointmentList.map((appointment, index) => (
          <Appointment
            appointmentData={appointment}
            onPress={() => handleAppointmentPress(appointment)}
            key={index}
          />
        ))}
      </ScrollView>
      {selectedAppointment &&
        (selectedAppointment.status === "accepted" ||
        selectedAppointment.status === "rejected" ? (
          <ModalPrompt
            isVisible={modalVisible}
            message={"Termin boste trajno izbrisali."}
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
          />
        ) : (
          <ModalAppointment
            isVisible={modalVisible}
            title={
              selectedAppointment.status === "pending"
                ? "Spremeni termin"
                : "Potrdi termin"
            }
            firstScreen={0}
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
          />
        ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    flex: 1,
  },
  contentContainer: {
    gap: 10,
    paddingTop: 15,
  },
});
