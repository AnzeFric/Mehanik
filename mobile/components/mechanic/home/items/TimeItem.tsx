import { View, StyleSheet, TouchableOpacity } from "react-native";
import { UserAppointmentData } from "@/interfaces/appointment";
import { formatTime } from "@/constants/util";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedView from "@/components/global/themed/ThemedView";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import { AppointmentStatus } from "@/interfaces/appointment";
import useUserStore from "@/stores/useUserStore";
import ModalInfo, { SectionData } from "@/components/shared/modals/ModalInfo";
import { useState } from "react";
import { formatDateTime } from "@/constants/util";

interface Props {
  appointment: UserAppointmentData;
  itemHeight: number;
}

export default function TimeItem({ appointment, itemHeight }: Props) {
  const { currentUser } = useUserStore();
  const { staticColors } = useAnimatedTheme();

  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [modalSections, setModalSections] = useState<Array<SectionData>>([]);

  const getDurationText = () => {
    const startTime = formatTime(appointment.startDate);
    const endTime = formatTime(appointment.endDate);
    return `${startTime} - ${endTime}`;
  };

  const statusToColor: Record<AppointmentStatus, string> = {
    accepted: staticColors.accepted,
    rejected: staticColors.rejected,
    pending: staticColors.pending,
    changed: staticColors.changed,
    unknown: staticColors.changed,
  };

  const statusToText: Record<AppointmentStatus, string> = {
    accepted: "Sprejeto",
    rejected: "Zavrnjeno",
    pending: "V obravnavi",
    changed: "Spremenjeno",
    unknown: "Zakrito",
  };

  const container = [
    styles.container,
    {
      height: itemHeight,
      borderLeftColor: statusToColor[appointment.status],
    },
  ];

  const statusIndicator = [
    styles.statusIndicator,
    {
      backgroundColor: statusToColor[appointment.status],
    },
  ];

  const handleItemPress = () => {
    if (currentUser.accountType === "mechanic") {
      const userSection: SectionData = {
        title: "Podatki o stranki",
        text: [`${appointment.user.firstName} ${appointment.user.lastName}`],
      };
      const dateSection: SectionData = {
        title: "Trajanje",
        text: [
          formatDateTime(appointment.startDate),
          formatDateTime(appointment.endDate),
        ],
      };
      const contactSection: SectionData = {
        title: "Kontakt",
        text: [appointment.user.email],
      };
      const vehicleSection: SectionData = {
        title: "Vozilo",
        text: [
          `${appointment.vehicle.brand} ${appointment.vehicle.model}, ${appointment.vehicle.buildYear}`,
        ],
      };
      const statusSection: SectionData = {
        title: "Status",
        text: [statusToText[appointment.status]],
      };
      const userMessage: SectionData = {
        title: "Sporočilo uporabnika",
        text: [appointment.userMessage],
      };
      setModalSections([
        userSection,
        dateSection,
        contactSection,
        vehicleSection,
        statusSection,
        userMessage,
      ]);
      setInfoModalVisible(true);
    }
  };

  return (
    <ThemedView type={"secondary"}>
      <TouchableOpacity style={container} onPress={handleItemPress}>
        <View style={{ flexDirection: "row" }}>
          <ThemedText type={"small"}>
            {appointment.user.firstName} {appointment.user.lastName}
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
        <View>
          <ThemedText type={"small"} bold>
            {"Sporočilo uporabnika:"}
          </ThemedText>
          <ThemedText type={"small"} numberOfLines={1}>
            {appointment.userMessage || "Ni opisa"}
          </ThemedText>
        </View>
      </TouchableOpacity>
      <ModalInfo
        isVisible={infoModalVisible}
        sections={modalSections}
        modalTitle={"Podatki o stranki"}
        onCancel={() => setInfoModalVisible(false)}
      />
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
    minHeight: 100,
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
