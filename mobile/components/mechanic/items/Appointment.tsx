import { View, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import ModalPrompt from "../../global/modals/ModalPrompt";
import ModalAppointment from "../../global/modals/ModalAppointment";
import { formatDateTime } from "@/constants/util";
import { AppointmentData, UserAppointmentData } from "@/interfaces/appointment";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedButton from "@/components/global/themed/ThemedButton";
import { useAppointment } from "@/hooks/useAppointment";
import useAppointmentStore from "@/stores/useAppointmentStore";

interface Props {
  appointmentData: UserAppointmentData;
}

export default function Appointment({ appointmentData }: Props) {
  const { updateAppointment, getMechanicAppointments } = useAppointment();
  const { setUserAppointments } = useAppointmentStore();

  const [isRejectOpen, setIsRejectOpen] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isChangeOpen, setIsChangeOpen] = useState<boolean>(false);

  const handleChangeConfirm = async (
    startDate: Date,
    endDate: Date,
    message: string
  ) => {
    setIsChangeOpen(false);
    const newAppointment: AppointmentData = {
      uuid: appointmentData.uuid,
      startDate: startDate,
      endDate: endDate,
      mechanicResponse: message,
      status: "changed",
    };
    const success = await updateAppointment(newAppointment, "mechanic");
    if (success) {
      const fetchedAppointments = await getMechanicAppointments();
      setUserAppointments(fetchedAppointments);
    } else {
      Alert.alert("Napaka", "Prišlo je do napake pri spreminjanju termina");
    }
  };

  const handleAcceptConfirm = async (
    startDate: Date,
    endDate: Date,
    userMessage: string
  ) => {
    setIsConfirmOpen(false);
    const newAppointment: UserAppointmentData = {
      ...appointmentData,
      status: "accepted",
    };
    const success = await updateAppointment(newAppointment, "mechanic");
    if (success) {
      const fetchedAppointments = await getMechanicAppointments();
      setUserAppointments(fetchedAppointments);
    } else {
      Alert.alert("Napaka", "Prišlo je do napake pri sprejemu termina");
    }
  };

  const handleRejectConfirm = async () => {
    setIsRejectOpen(false);
    const newAppointment: UserAppointmentData = {
      ...appointmentData,
      status: "rejected",
    };
    const success = await updateAppointment(newAppointment, "mechanic");
    if (success) {
      const fetchedAppointments = await getMechanicAppointments();
      setUserAppointments(fetchedAppointments);
    } else {
      Alert.alert("Napaka", "Prišlo je do napake pri zavračanju termina");
    }
  };

  return (
    <ThemedView type={"primary"} style={styles.container}>
      <View style={{ gap: 10 }}>
        <View style={styles.userVehicleInfo}>
          <ThemedText type={"normal"} bold>
            {appointmentData.user.firstName} {appointmentData.user.lastName}
          </ThemedText>
          <ThemedText type={"extraSmall"} bold>
            {appointmentData.vehicle.brand} {appointmentData.vehicle.model},{" "}
            {appointmentData.vehicle.buildYear}
          </ThemedText>
        </View>
        <View style={{ paddingStart: 10 }}>
          <ThemedText type={"small"}>
            Od: {formatDateTime(appointmentData.startDate)}
          </ThemedText>
          <ThemedText type={"small"}>
            Do: {formatDateTime(appointmentData.endDate)}
          </ThemedText>
        </View>
      </View>

      <ThemedView type={"secondary"} style={styles.serviceInfo}>
        <ThemedText type={"extraSmall"} bold>
          Potrebno popravilo:
        </ThemedText>
        <ThemedText type={"small"}>{appointmentData.userMessage}</ThemedText>
      </ThemedView>

      <View style={{ flexDirection: "row", gap: 15 }}>
        <ThemedButton
          buttonText={"Zavrni"}
          buttonType={"option-destroy"}
          onPress={() => setIsRejectOpen(true)}
        />
        <ThemedButton
          buttonText={"Spremeni"}
          buttonType={"option-change"}
          onPress={() => setIsChangeOpen(true)}
        />
        <ThemedButton
          buttonText={"Potrdi"}
          buttonType={"option"}
          onPress={() => setIsConfirmOpen(true)}
        />
      </View>

      {isRejectOpen && (
        <ModalPrompt
          isVisible={true}
          message={"Ste prepričani, da želite zavrniti termin?"}
          onCancel={() => setIsRejectOpen(false)}
          onConfirm={handleRejectConfirm}
        />
      )}
      {isConfirmOpen && (
        <ModalAppointment
          isVisible={true}
          title={"Potrditev termina"}
          firstScreen={2}
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={handleAcceptConfirm}
        />
      )}
      {isChangeOpen && (
        <ModalAppointment
          isVisible={true}
          title={"Sprememba termina"}
          firstScreen={0}
          startDate={appointmentData.startDate}
          endDate={appointmentData.endDate}
          onCancel={() => setIsChangeOpen(false)}
          onConfirm={handleChangeConfirm}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 20,
  },
  userVehicleInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceInfo: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
});
