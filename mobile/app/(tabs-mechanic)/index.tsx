import { View, StyleSheet } from "react-native";
import DaySchedule from "@/components/mechanic/home/DaySchedule";
import { router } from "expo-router";
import TitleRow from "@/components/shared/TitleRow";
import ThemedIcon from "@/components/global/themed/ThemedIcon";
import ThemedView from "@/components/global/themed/ThemedView";

export default function HomeMechanicScreen() {
  return (
    <ThemedView style={styles.container}>
      <TitleRow
        title={"Pregled terminov"}
        hasBackButton={false}
        menuButton={
          <ThemedIcon
            name={"menu"}
            size={30}
            onPress={() => {
              router.push("/(shared)/settings");
            }}
          />
        }
      />
      <View style={styles.contentContainer}>
        <DaySchedule />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 10,
    paddingTop: 15,
    flex: 1,
  },
});
