import { View, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import { router } from "expo-router";

export default function HomeUserScreen() {
  return (
    <View style={[AppStyles.parentPadding, { flex: 1 }]}>
      <View style={styles.settingsIcon}>
        <MenuIcon
          height={30}
          width={30}
          onPress={() => {
            router.push("/(tabs-mechanic)/settings");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsIcon: {
    alignSelf: "flex-end",
  },
});
