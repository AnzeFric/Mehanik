import { Alert, View } from "react-native";
import TimeItem from "./TimeItem";
import { useAppointment } from "@/hooks/useAppointment";
import { useAppointmentUtils } from "@/hooks/useAppointmentUtils";
import EmptyTimeItem from "./EmptyTimeItem";
import { AppointmentData, UserAppointmentData } from "@/interfaces/appointment";
import useUserStore from "@/stores/useUserStore";
import useVehicleStore from "@/stores/useVehicleStore";
import ModalSelectVehicle from "@/components/shared/modals/ModalSelectVehicle";
import { VehicleData } from "@/interfaces/vehicle";
import { useState } from "react";
import { router } from "expo-router";

interface Props {
  time: string;
  itemHeight: number;
  mechanicEmail?: string;
  groupedAppointments: Array<UserAppointmentData>;
}

export default function TimeContainer({
  time,
  itemHeight,
  mechanicEmail,
  groupedAppointments,
}: Props) {
  const { currentUser } = useUserStore();
  const { saveAppointment } = useAppointment();
  const {
    isWithinAppointmentDuration,
    getAppointmentHeight,
    getAppointmentAtHour,
    isAppointmentStartHour,
  } = useAppointmentUtils();

  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData>();

  const hour = parseInt(time.split(":")[0]);
  const appointment = getAppointmentAtHour(groupedAppointments, hour);

  // Find any appointment that spans this hour, start or any time in between
  const spanningAppointment = groupedAppointments.find((apt) =>
    isWithinAppointmentDuration(hour, apt)
  );

  // Only allow users to reserve appointments
  const reserveAppointmentPress = async () => {
    if (currentUser.accountType === "user") {
      const reserveAppointment: AppointmentData = {
        startDate: new Date(),
        endDate: new Date(),
        userMessage: "Hello",
        status: "pending",
      };
      if (mechanicEmail && selectedVehicle) {
        const success = await saveAppointment(
          mechanicEmail,
          selectedVehicle.uuid,
          reserveAppointment
        );

        if (!success) {
          Alert.alert(
            "Napaka",
            "Prišlo je do napake pri shranjevanju termina. Poskusite ponovno kasneje"
          );
        }
        router.replace("/(tabs-user)/mechanics");
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {appointment && isAppointmentStartHour(hour, appointment) ? (
        <TimeItem
          appointment={appointment}
          itemHeight={getAppointmentHeight(appointment, itemHeight)}
        />
      ) : spanningAppointment ? null : ( // This hour is part of an ongoing appointment, render nothing
        <EmptyTimeItem
          itemHeight={itemHeight}
          onPress={reserveAppointmentPress}
        />
      )}
      <ModalSelectVehicle />
    </View>
  );
}
