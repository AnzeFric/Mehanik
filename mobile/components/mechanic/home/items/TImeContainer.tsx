import { Alert, View } from "react-native";
import TimeItem from "./TimeItem";
import PrivateTimeItem from "./PrivateTimeItem";
import { useAppointment } from "@/hooks/useAppointment";
import { useAppointmentUtils } from "@/hooks/utils/useAppointmentUtils";
import EmptyTimeItem from "./EmptyTimeItem";
import { AppointmentData, UserAppointmentData } from "@/interfaces/appointment";
import useUserStore from "@/stores/accounts/useUserStore";
import useVehicleStore from "@/stores/useVehicleStore";
import ModalSelectVehicle from "@/components/shared/modals/ModalSelectVehicle";
import { VehicleData } from "@/interfaces/vehicle";
import { useState } from "react";
import { router } from "expo-router";
import ModalAppointment from "@/components/shared/modals/ModalAppointment";

interface Props {
  time: string; // 11:00
  date: Date;
  itemHeight: number;
  mechanicEmail?: string;
  groupedAppointments: Array<UserAppointmentData>;
}

export default function TimeContainer({
  time,
  date,
  itemHeight,
  mechanicEmail,
  groupedAppointments,
}: Props) {
  const { currentUser } = useUserStore();
  const { vehicles } = useVehicleStore();
  const { saveAppointment } = useAppointment();
  const {
    isWithinAppointmentDuration,
    getAppointmentHeight,
    getAppointmentAtHour,
    isAppointmentStartHour,
  } = useAppointmentUtils();

  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData>();
  const [isVehicleVisible, setIsVehicleVisible] = useState(false);
  const [isAppointmentVisible, setIsAppointmentVisible] = useState(false);

  const hour = parseInt(time.split(":")[0]);
  const appointmentAtHour = getAppointmentAtHour(groupedAppointments, hour);

  const modalAppointmentDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hour,
    0,
    0,
    0
  );

  // Find any appointment that spans this hour, start or any time in between
  const spanningAppointment = groupedAppointments.find((apt) =>
    isWithinAppointmentDuration(hour, apt)
  );

  const reserveAppointmentPress = async (appointment: AppointmentData) => {
    if (mechanicEmail && selectedVehicle) {
      console.log("Sending appointment: ", appointment);
      const success = await saveAppointment(
        selectedVehicle.uuid,
        mechanicEmail,
        appointment
      );

      if (!success) {
        Alert.alert(
          "Napaka",
          "Prišlo je do napake pri shranjevanju termina. Poskusite ponovno kasneje"
        );
      }
      router.replace("/(tabs-user)/mechanics");
    }
  };

  const handleAppointmentConfirm = (
    startDate: Date,
    endDate: Date,
    userMessage: string
  ) => {
    const appointment: AppointmentData = {
      uuid: appointmentAtHour?.uuid || "",
      startDate: startDate,
      endDate: endDate,
      userMessage: userMessage,
      status: "pending",
    };
    setIsAppointmentVisible(false);
    reserveAppointmentPress(appointment);
  };

  const handleVehicleConfirm = (vehicle: VehicleData) => {
    setSelectedVehicle(vehicle);
    setIsVehicleVisible(false);
    setIsAppointmentVisible(true);
  };

  const handleEmptyItemPress = () => {
    if (currentUser.accountType === "user") {
      setIsVehicleVisible(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {appointmentAtHour && isAppointmentStartHour(hour, appointmentAtHour) ? (
        currentUser.accountType === "mechanic" ? (
          <TimeItem
            appointment={appointmentAtHour}
            itemHeight={getAppointmentHeight(appointmentAtHour, itemHeight)}
          />
        ) : (
          <PrivateTimeItem
            startDate={appointmentAtHour.startDate}
            endDate={appointmentAtHour.endDate}
            itemHeight={getAppointmentHeight(appointmentAtHour, itemHeight)}
          />
        )
      ) : spanningAppointment ? null : ( // This hour is part of an ongoing appointment, render nothing
        <EmptyTimeItem itemHeight={itemHeight} onPress={handleEmptyItemPress} />
      )}
      <ModalSelectVehicle
        vehicles={vehicles}
        isVisible={isVehicleVisible}
        onConfirm={handleVehicleConfirm}
        setIsVisible={setIsVehicleVisible}
      />
      <ModalAppointment
        isVisible={isAppointmentVisible}
        title={"Izberite termin"}
        firstScreen={0}
        startDate={modalAppointmentDate}
        endDate={modalAppointmentDate}
        onConfirm={handleAppointmentConfirm}
        onCancel={() => setIsAppointmentVisible(false)}
      />
    </View>
  );
}
