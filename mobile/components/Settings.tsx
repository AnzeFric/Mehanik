import { View, Text, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";
import BackIcon from "@/assets/icons/BackIcon.svg";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

interface Props {
  isMechanic: boolean;
}

export default function Settings({ isMechanic }: Props) {
  return (
    <View style={AppStyles.parentPadding}>
      <View style={styles.header}>
        <BackIcon
          height={30}
          width={30}
          style={{ alignSelf: "flex-start" }}
          onPress={() => {
            router.back();
          }}
        />
        <Text style={styles.greeting}>
          Zdravo {isMechanic ? "Mehanik" : "Uporabnik"}!
        </Text>
      </View>
      <View>
        <Text>Color theme</Text>
        <Text>Enable/Disable notifications</Text>
        <Text>Change name</Text>
        <Text>Terms</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomColor: Colors.light.inactiveBorder,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "dashed",
  },
  greeting: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: "Jaldi-Regular",
    flex: 1,
    textAlign: "center",
  },
});
