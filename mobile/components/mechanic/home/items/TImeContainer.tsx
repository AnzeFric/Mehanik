import { View } from "react-native";
import TimeItem from "./TimeItem";
import { useAppointment } from "@/hooks/useAppointment";
import { GroupedAppointmentData } from "@/interfaces/appointment";
import EmptyTimeItem from "./EmptyTimeItem";

interface Props {
  time: string;
  itemHeight: number;
  groupedAppointments: Array<GroupedAppointmentData>;
}

export default function TimeContainer({
  time,
  itemHeight,
  groupedAppointments,
}: Props) {
  const { getAppointmentAtHour, isAppointmentStartHour } = useAppointment();

  const hour = parseInt(time.split(":")[0]);
  const appointment = getAppointmentAtHour(groupedAppointments, hour);

  return (
    <View style={{ flex: 1 }}>
      {appointment && isAppointmentStartHour(hour, appointment) ? (
        <TimeItem appointment={appointment} itemHeight={itemHeight} />
      ) : !appointment ? (
        <EmptyTimeItem itemHeight={itemHeight} onPress={() => {}} />
      ) : null}
    </View>
  );
}
