import { View, StyleSheet, TouchableOpacity } from "react-native";
import { formatTime } from "@/constants/util";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedView from "@/components/global/themed/ThemedView";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";

interface Props {
  startDate: Date;
  endDate: Date;
  itemHeight: number;
}

export default function TimeItem({ startDate, endDate, itemHeight }: Props) {
  const { staticColors } = useAnimatedTheme();

  const getDurationText = () => {
    const startTime = formatTime(startDate);
    const endTime = formatTime(endDate);
    return `${startTime} - ${endTime}`;
  };

  const container = [
    styles.container,
    {
      height: itemHeight,
      borderLeftColor: staticColors.unknown,
    },
  ];

  return (
    <ThemedView type={"secondary"}>
      <TouchableOpacity style={container} onPress={() => {}}>
        <View style={{ flexDirection: "row" }}>
          <ThemedText type={"small"}>Zaseden termin, </ThemedText>
          <ThemedText type={"small"}>{getDurationText()}</ThemedText>
        </View>
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
    minHeight: 100,
  },
});
