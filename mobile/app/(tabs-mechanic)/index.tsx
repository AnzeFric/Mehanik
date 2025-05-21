import { View, StyleSheet } from "react-native";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import DaySchedule from "@/components/mechanic/home/DaySchedule";
import { router } from "expo-router";
import TitleRow from "@/components/shared/TitleRow";

export default function HomeMechanicScreen() {
  return (
    <View style={styles.container}>
      <TitleRow
        title={"Pregled terminov"}
        hasBackButton={false}
        menuButton={
          <MenuIcon
            height={30}
            width={30}
            onPress={() => {
              router.push("/(shared)/settings");
            }}
          />
        }
      />
      <View style={styles.contentContainer}>
        <DaySchedule />
      </View>
    </View>
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
