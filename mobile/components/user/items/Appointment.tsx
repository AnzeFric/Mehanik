import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { formatDate } from "@/constants/util";
import { useMemo } from "react";
import {
  AppointmentStatus,
  MechanicAppointmentData,
} from "@/interfaces/appointment";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

interface Props {
  appointmentData: MechanicAppointmentData;
  onPress: () => void;
}

export default function Appointment({ appointmentData, onPress }: Props) {
  const { staticColors } = useAnimatedTheme();

  const statusToTranslation = (status: AppointmentStatus): string => {
    switch (status) {
      case "accepted":
        return "je bil sprejet";
      case "rejected":
        return "je bil zavrnjen";
      case "changed":
        return "je bil spremenjen";
      case "pending":
        return "še v pregledu";
    }
  };

  const statusToColor = (status: AppointmentStatus): string => {
    switch (status) {
      case "accepted":
        return staticColors.accepted;
      case "rejected":
        return staticColors.rejected;
      case "changed":
        return staticColors.changed;
      case "pending":
        return staticColors.pending;
    }
  };

  const statusColor = useMemo(() => {
    return statusToColor(appointmentData.status);
  }, [appointmentData, appointmentData.status]);

  return (
    <TouchableOpacity
      style={[styles.container, { borderLeftColor: statusColor }]}
      onPress={onPress}
    >
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>
          {appointmentData.mechanic.firstName}{" "}
          {appointmentData.mechanic.lastName}
        </Text>
        {appointmentData.mechanic.address && (
          <Text style={styles.address}>
            {appointmentData.mechanic.address}, {appointmentData.mechanic.city}
          </Text>
        )}
        {appointmentData.mechanic.email && (
          <Text style={styles.contact}>{appointmentData.mechanic.email}</Text>
        )}
        <Text style={styles.statusText}>
          Termin {formatDate(appointmentData.startDate)},{" "}
          <Text style={{ color: statusColor }}>
            {statusToTranslation(appointmentData.status)}
          </Text>
          .
        </Text>
        {appointmentData.mechanicResponse && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageTitle}>Sporočilo avtomehanika:</Text>
            <Text style={styles.messageText}>
              {appointmentData.mechanicResponse}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderLeftWidth: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
    color: "#666",
  },
  contact: {
    fontSize: 14,
    color: "#888",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  messageContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
  },
  messageTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 3,
  },
  messageText: {
    fontSize: 14,
    color: "#333",
  },
});
