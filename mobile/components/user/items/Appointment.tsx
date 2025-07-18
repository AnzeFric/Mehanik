import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { formatDate } from "@/constants/util";
import { useMemo } from "react";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import {
  AppointmentStatus,
  MechanicAppointmentData,
} from "@/interfaces/appointment";

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
      case "unknown":
        return "Zakrito";
      case "hidden":
        return "Končano";
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
      case "unknown":
        return staticColors.pending;
      case "hidden":
        return staticColors.pending;
    }
  };

  const statusColor = useMemo(() => {
    return statusToColor(appointmentData.status);
  }, [appointmentData, appointmentData.status]);

  return (
    <ThemedView
      type={"primary"}
      style={{ borderLeftWidth: 6, borderLeftColor: statusColor }}
    >
      <TouchableOpacity onPress={onPress} style={{ padding: 15 }}>
        <View style={{ flex: 1 }}>
          <ThemedText type={"normal"} bold>
            {appointmentData.mechanic.firstName}{" "}
            {appointmentData.mechanic.lastName}
          </ThemedText>
          {appointmentData.mechanic.address && (
            <ThemedText type={"extraSmall"}>
              {appointmentData.mechanic.address},{" "}
              {appointmentData.mechanic.city}
            </ThemedText>
          )}
          {appointmentData.mechanic.email && (
            <ThemedText type={"extraSmall"}>
              {appointmentData.mechanic.email}
            </ThemedText>
          )}
          {appointmentData.mechanic.phone && (
            <ThemedText type={"extraSmall"}>
              {appointmentData.mechanic.phone}
            </ThemedText>
          )}
          <View style={{ paddingVertical: 10 }}>
            <ThemedText type={"extraSmall"}>
              {appointmentData.vehicle.brand} {appointmentData.vehicle.model}
              {appointmentData.vehicle.buildYear &&
                `, ${appointmentData.vehicle.buildYear}`}
            </ThemedText>
          </View>
          <ThemedText type={"extraSmall"} bold>
            Termin {formatDate(appointmentData.startDate)},{" "}
            <Text style={{ color: statusColor }}>
              {statusToTranslation(appointmentData.status)}
            </Text>
          </ThemedText>
          {appointmentData.mechanicResponse && (
            <ThemedView type={"secondary"} style={styles.messageContainer}>
              <ThemedText type={"extraSmall"} bold>
                Sporočilo avtomehanika:
              </ThemedText>
              <ThemedText type={"extraSmall"}>
                {appointmentData.mechanicResponse}
              </ThemedText>
            </ThemedView>
          )}
        </View>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    gap: 5,
  },
});
