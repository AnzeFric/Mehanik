import { View, StyleSheet } from "react-native";
import TimeItem from "./TimeItem";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import { useAppointment } from "@/hooks/useAppointment";
import { GroupedAppointmentData } from "@/interfaces/appointment";

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
        <ThemedView
          type={"primary"}
          style={[styles.emptySlot, { height: itemHeight }]}
        >
          <ThemedText type={"small"}>Prazen termin</ThemedText>
        </ThemedView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  emptySlot: {
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
});
