import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
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
    Accepted: staticColors.specialBlue,
    Rejected: "",
    Pending: "",
    Changed: "",
  };

  return (
    <ThemedView type={"secondary"}>
      <TouchableOpacity
        style={[
          styles.container,
          {
            height: appointment.numAppointments * itemHeight,
            borderLeftColor: staticColors.specialBlue,
          },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <ThemedText type={"small"} style={styles.name}>
            {appointment.customerFirstName} {appointment.customerLastName}
            {", "}
          </ThemedText>
          <ThemedText type={"small"} style={styles.durationText}>
            {getDurationText()}
          </ThemedText>
        </View>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusIndicator,
              {
                backgroundColor:
                  appointment.status === "Accepted"
                    ? staticColors.specialBlue
                    : "#9CA3AF",
              },
            ]}
          />
          <ThemedText type={"extraSmall"}>{appointment.status}</ThemedText>
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
  durationText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  customerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
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
