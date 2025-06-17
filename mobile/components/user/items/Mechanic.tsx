import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { MechanicData } from "@/interfaces/user";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

interface Props {
  mechanicData: MechanicData;
}

export default function Mechanic({ mechanicData }: Props) {
  const { staticColors } = useAnimatedTheme();

  const handlePress = () => {
    router.push(`/(tabs-user)/mechanics/mechanic/${mechanicData.email}`);
  };

  return (
    <ThemedView type={"secondary"}>
      <TouchableOpacity
        style={[
          styles.container,
          { borderLeftColor: staticColors.specialBlue },
        ]}
        activeOpacity={0.7}
        onPress={handlePress}
      >
        {mechanicData.info.image ? (
          <Image
            source={{ uri: mechanicData.info.image }}
            style={styles.image}
          />
        ) : (
          <Image
            source={require("@/assets/logo-main.png")}
            style={styles.image}
          />
        )}
        <View style={{ flex: 1 }}>
          <ThemedText type={"small"} bold>
            {mechanicData.firstName} {mechanicData.lastName}
          </ThemedText>
          {mechanicData.info.address && (
            <ThemedText type={"extraSmall"}>
              {mechanicData.info.address}, {mechanicData.info.city}
            </ThemedText>
          )}

          {mechanicData.info.phone && (
            <ThemedText type={"extraSmall"}>
              {mechanicData.info.phone}
            </ThemedText>
          )}
          {mechanicData.email && (
            <ThemedText type={"extraSmall"}>{mechanicData.email}</ThemedText>
          )}
        </View>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    borderLeftWidth: 6,
    alignItems: "center",
    gap: 15,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 6,
  },
});
