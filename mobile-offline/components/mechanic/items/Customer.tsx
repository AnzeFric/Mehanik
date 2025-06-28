import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { CustomerVehicleData } from "@/interfaces/customer";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

interface Props {
  customerData: CustomerVehicleData;
}

export default function Customer({ customerData }: Props) {
  const { staticColors } = useAnimatedTheme();

  const handlePress = () => {
    router.push(
      `/customer/${customerData.vehicle.uuid}?firstName=${customerData.customer.firstName}`
    );
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
        {customerData.vehicle.image ? (
          <Image
            source={{ uri: customerData.vehicle.image }}
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
            {customerData.customer.firstName} {customerData.customer.lastName}
          </ThemedText>
          <ThemedText type={"extraSmall"}>
            {customerData.vehicle.brand} {customerData.vehicle.model}
            {customerData.vehicle.buildYear && (
              <>
                {", "}
                {customerData.vehicle.buildYear}
              </>
            )}
          </ThemedText>
          <ThemedText type={"extraSmall"}>
            {customerData.vehicle.vin}
          </ThemedText>
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
