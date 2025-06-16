import { View } from "react-native";
import TimeItem from "./TimeItem";
import { useAppointment } from "@/hooks/useAppointment";
import EmptyTimeItem from "./EmptyTimeItem";
import { UserAppointmentData } from "@/interfaces/appointment";

interface Props {
  time: string;
  itemHeight: number;
  groupedAppointments: Array<UserAppointmentData>;
}

export default function TimeContainer({
  time,
  itemHeight,
  groupedAppointments,
}: Props) {
  const {
    isWithinAppointmentDuration,
    getAppointmentHeight,
    getAppointmentAtHour,
    isAppointmentStartHour,
  } = useAppointment();

  const hour = parseInt(time.split(":")[0]);
  const appointment = getAppointmentAtHour(groupedAppointments, hour);

  // Find any appointment that spans this hour, start or any time in between
  const spanningAppointment = groupedAppointments.find((apt) =>
    isWithinAppointmentDuration(hour, apt)
  );

  return (
    <View style={{ flex: 1 }}>
      {appointment && isAppointmentStartHour(hour, appointment) ? (
        <TimeItem
          appointment={appointment}
          itemHeight={getAppointmentHeight(appointment, itemHeight)}
        />
      ) : spanningAppointment ? null : ( // This hour is part of an ongoing appointment, render nothing
        <EmptyTimeItem itemHeight={itemHeight} onPress={() => {}} />
      )}
    </View>
  );
}
