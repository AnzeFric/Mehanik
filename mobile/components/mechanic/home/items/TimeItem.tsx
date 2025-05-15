import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { GroupedAppointmentData } from "../TimeList";

interface Props {
  appointment: GroupedAppointmentData;
}

export default function TimeItem({ appointment }: Props) {
  // Format time for display (HH:MM)
  const formatTime = (date: Date) => {
    return (
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0")
    );
  };

  // Calculate appointment duration for display
  const getDurationText = () => {
    const startTime = formatTime(appointment.startDateTime);
    const endTime = formatTime(appointment.endDateTime);
    return `${startTime} - ${endTime}`;
  };

  return (
    <TouchableOpacity
      style={[styles.container, { height: appointment.numAppointments * 80 }]}
    >
      <View style={styles.timeInfo}>
        <Text style={styles.durationText}>{getDurationText()}</Text>
      </View>
      <View style={styles.customerInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {appointment.customerFirstName} {appointment.customerLastName}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusIndicator,
              {
                backgroundColor:
                  appointment.status === "Accepted"
                    ? Colors.light.specialBlue
                    : "#9CA3AF",
              },
            ]}
          />
          <Text style={styles.statusText}>{appointment.status}</Text>
        </View>
      </View>
      <Text style={styles.descriptionText} numberOfLines={1}>
        {appointment.description || "Ni opisa"}
      </Text>
      <Text style={styles.descriptionText} numberOfLines={1}>
        {appointment.numAppointments}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    borderLeftWidth: 6,
    borderLeftColor: Colors.light.specialBlue,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  timeInfo: {},
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
  nameContainer: {
    flex: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111827",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusText: {
    fontSize: 13,
    color: "#4B5563",
  },
  descriptionText: {
    fontSize: 14,
    color: "#6B7280",
  },
});
