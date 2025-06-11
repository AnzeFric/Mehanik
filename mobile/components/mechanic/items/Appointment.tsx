import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import ModalPrompt from "../modals/ModalPrompt";
import ModalAppointment from "../modals/ModalAppointment";
import { formatDateTime } from "@/constants/util";
import { AppointmentData } from "@/interfaces/appointment";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  appointmentData: AppointmentData;
}

export default function Appointment({ appointmentData }: Props) {
  const [isRejectOpen, setIsRejectOpen] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isChangeOpen, setIsChangeOpen] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{appointmentData.name}</Text>
          <View style={styles.vehicleBadge}>
            <Text style={styles.vehicleText}>{appointmentData.vehicle}</Text>
          </View>
        </View>
        <Text style={styles.date}>
          {formatDateTime(appointmentData.dateTime)}
        </Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{appointmentData.description}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.buttonReject}
          onPress={() => setIsRejectOpen(true)}
        >
          <Ionicons
            name="close-outline"
            size={18}
            color={Colors.light.activeIcon}
          />
          <Text style={styles.buttonText}>Zavrni</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonChange}
          onPress={() => setIsChangeOpen(true)}
        >
          <Ionicons
            name="calendar-outline"
            size={18}
            color={Colors.light.activeIcon}
          />
          <Text style={styles.buttonText}>Spremeni</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonAccept}
          onPress={() => setIsConfirmOpen(true)}
        >
          <Ionicons
            name="checkmark-outline"
            size={18}
            color={Colors.light.activeIcon}
          />
          <Text style={styles.buttonText}>Potrdi</Text>
        </TouchableOpacity>
      </View>

      <ModalPrompt
        isVisible={isRejectOpen}
        message={"Ste prepričani, da želite zavrniti termin?"}
        onCancel={() => setIsRejectOpen(false)}
        onConfirm={() => {}}
      />
      <ModalAppointment
        isVisible={isConfirmOpen}
        title={"Potrditev termina"}
        firstScreen={2}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {}}
      />
      <ModalAppointment
        isVisible={isChangeOpen}
        title={"Sprememba termina"}
        firstScreen={0}
        onCancel={() => setIsChangeOpen(false)}
        onConfirm={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "column",
    gap: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.primaryText,
  },
  vehicleBadge: {
    backgroundColor: Colors.light.inactiveButton,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  vehicleText: {
    fontSize: 14,
    color: Colors.light.primaryText,
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.light.secondaryText,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  descriptionContainer: {
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.light.primaryText,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonReject: {
    backgroundColor: Colors.light.cancelButton,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  buttonAccept: {
    backgroundColor: Colors.light.confirmButton,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  buttonChange: {
    backgroundColor: Colors.light.inactiveButton,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.light.primaryText,
  },
});
