import { Text, View, StyleSheet } from "react-native";
import { AppointmentData, Status } from "@/interfaces/user";
import { formatDate } from "@/constants/util";
import { useMemo } from "react";

interface Props {
  appointmentData: AppointmentData;
}

function getColor(status: Status): string {
  switch (status) {
    case "Accepted":
      return "#4CAF50"; // Green
    case "Rejected":
      return "#F44336"; // Red
    case "Changed":
      return "#2196F3"; // Blue
    case "Pending":
      return "#FFC107"; // Yellow
  }
}

function getStatusTranslation(status: Status): string {
  switch (status) {
    case "Accepted":
      return "je bil sprejet";
    case "Rejected":
      return "je bil zavrnjen";
    case "Changed":
      return "je bil spremenjen";
    case "Pending":
      return "še v pregledu";
  }
}

export default function Appointment({ appointmentData }: Props) {
  const textColor = useMemo(() => {
    return getColor(appointmentData.status);
  }, [appointmentData.status]);

  return (
    <View style={[styles.container, { borderLeftColor: textColor }]}>
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
        {appointmentData.mechanic.phoneNumber && (
          <Text style={styles.contact}>
            {appointmentData.mechanic.phoneNumber}
          </Text>
        )}
        {appointmentData.mechanic.email && (
          <Text style={styles.contact}>{appointmentData.mechanic.email}</Text>
        )}
        <Text style={styles.statusText}>
          Termin {formatDate(appointmentData.date)},{" "}
          <Text style={{ color: textColor }}>
            {getStatusTranslation(appointmentData.status)}
          </Text>
          .
        </Text>
        {appointmentData.mechanicMessage && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageTitle}>Sporočilo avtomehanika:</Text>
            <Text style={styles.messageText}>
              {appointmentData.mechanicMessage}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 0,
    borderLeftWidth: 8,
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
