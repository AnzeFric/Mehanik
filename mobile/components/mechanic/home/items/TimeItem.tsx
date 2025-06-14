import { View, StyleSheet, TouchableOpacity } from "react-native";
import { GroupedAppointmentData } from "@/interfaces/appointment";
import { formatTime } from "@/constants/util";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedView from "@/components/global/themed/ThemedView";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import { Status } from "@/interfaces/user";

interface Props {
  appointment: GroupedAppointmentData;
  itemHeight: number;
}

export default function TimeItem({ appointment, itemHeight }: Props) {
  const { staticColors } = useAnimatedTheme();

  const getDurationText = () => {
    const startTime = formatTime(appointment.startDateTime);
    const endTime = formatTime(appointment.endDateTime);
    return `${startTime} - ${endTime}`;
  };

  const statusToColor: Record<Status, string> = {
    Accepted: staticColors.accepted,
    Rejected: staticColors.rejected,
    Pending: staticColors.pending,
    Changed: staticColors.changed,
  };

  const statusToText: Record<Status, string> = {
    Accepted: "Sprejeto",
    Rejected: "Zavrnjeno",
    Pending: "V obravnavi",
    Changed: "Spremenjeno",
  };

  const container = [
    styles.container,
    {
      height: appointment.numAppointments * itemHeight,
      borderLeftColor: statusToColor[appointment.status],
    },
  ];

  const statusIndicator = [
    styles.statusIndicator,
    {
      backgroundColor: statusToColor[appointment.status],
    },
  ];

  return (
    <ThemedView type={"secondary"}>
      <TouchableOpacity style={container}>
        <View style={{ flexDirection: "row" }}>
          <ThemedText type={"small"}>
            {appointment.customerFirstName} {appointment.customerLastName}
            {", "}
          </ThemedText>
          <ThemedText type={"small"}>{getDurationText()}</ThemedText>
        </View>
        <View style={styles.statusContainer}>
          <View style={statusIndicator} />
          <ThemedText type={"extraSmall"}>
            {statusToText[appointment.status]}
          </ThemedText>
        </View>
        <ThemedText type={"small"} numberOfLines={1}>
          {appointment.description || "Ni opisa"}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderLeftWidth: 6,
    padding: 12,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
});
