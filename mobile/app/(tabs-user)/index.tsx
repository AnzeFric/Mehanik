import { Alert } from "react-native";
import { useState, useEffect } from "react";
import { router } from "expo-router";
import Appointment from "@/components/user/items/Appointment";
import TitleRow from "@/components/shared/TitleRow";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedIcon from "@/components/global/themed/ThemedIcon";
import ModalAppointment from "@/components/shared/modals/ModalAppointment";
import ModalPrompt from "@/components/shared/modals/ModalPrompt";
import {
  AppointmentData,
  MechanicAppointmentData,
} from "@/interfaces/appointment";
import { useAppointment } from "@/hooks/useAppointment";
import DisplayItems from "@/components/global/DisplayItems";

export default function HomeUserScreen() {
  const { getUserAppointments, deleteAppointment, updateAppointment } =
    useAppointment();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<MechanicAppointmentData | null>(null);

  const [appointmentList, setAppointmentList] = useState<
    Array<MechanicAppointmentData>
  >([]);

  const fetchUserAppointments = async () => {
    const appointments = await getUserAppointments();
    setAppointmentList(appointments);
  };

  const handleAppointmentPress = (appointment: MechanicAppointmentData) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedAppointment) {
      setModalVisible(false);
      const success = await deleteAppointment(selectedAppointment.uuid);
      if (success) {
        await fetchUserAppointments();
      } else {
        Alert.alert(
          "Napaka",
          "Prišlo je do napake pri brisanju termina. Poskusite ponovno kasneje"
        );
      }
    }
  };

  const handleAcceptConfirm = async () => {
    if (selectedAppointment) {
      setModalVisible(false);
      const newAppointment: AppointmentData = {
        ...selectedAppointment,
        status: "hidden",
      };

      const success = await updateAppointment(newAppointment, "user");
      if (success) {
        await fetchUserAppointments();
      } else {
        Alert.alert(
          "Napaka",
          "Prišlo je do napake pri brisanju termina. Poskusite ponovno kasneje"
        );
      }
    }
  };

  const handleChangeConfirm = async (
    startDate: Date,
    endDate: Date,
    message: string
  ) => {
    if (selectedAppointment) {
      setModalVisible(false);
      if (
        selectedAppointment.startDate === startDate &&
        selectedAppointment.endDate === endDate
      ) {
        // Accept the mechanic changes
        const newAppointment: AppointmentData = {
          ...selectedAppointment,
          status: "accepted",
        };
        var success = await updateAppointment(newAppointment, "user");
      } else {
        // Change the mechanic changes
        const newAppointment: AppointmentData = {
          ...selectedAppointment,
          startDate: startDate,
          endDate: endDate,
          userMessage: message,
          status: "pending",
        };
        var success = await updateAppointment(newAppointment, "user");
      }

      if (success) {
        await fetchUserAppointments();
      } else {
        Alert.alert(
          "Napaka",
          "Prišlo je do napake pri posodabljanju termina. Poskusite ponovno kasneje"
        );
      }
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    fetchUserAppointments();
  }, []);

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
      <DisplayItems
        list={appointmentList}
        renderItem={(appointment, index) => (
          <Appointment
            appointmentData={appointment}
            onPress={() => handleAppointmentPress(appointment)}
            key={index}
          />
        )}
        emptyMessage="Nimate vnešenih terminov."
      />
      {selectedAppointment && selectedAppointment.status === "accepted" && (
        <ModalPrompt
          isVisible={modalVisible}
          message={"Termin boste trajno izbrisali."}
          onConfirm={handleAcceptConfirm}
          onCancel={handleModalCancel}
        />
      )}
      {selectedAppointment && selectedAppointment.status === "rejected" && (
        <ModalPrompt
          isVisible={modalVisible}
          message={"Termin boste trajno izbrisali."}
          onConfirm={handleDeleteConfirm}
          onCancel={handleModalCancel}
        />
      )}

      {selectedAppointment && selectedAppointment.status === "changed" && (
        <ModalAppointment
          isVisible={modalVisible}
          title={"Spremeni termin"}
          startDate={selectedAppointment.startDate}
          endDate={selectedAppointment.endDate}
          firstScreen={0}
          onConfirm={handleChangeConfirm}
          onCancel={handleModalCancel}
        />
      )}
    </ThemedView>
  );
}
