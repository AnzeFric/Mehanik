import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { CustomerFormData } from "@/interfaces/customer";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

interface Props {
  customer: CustomerFormData;
}

export default function Customer({ customer }: Props) {
  const { staticColors } = useAnimatedTheme();

  const handlePress = () => {
    console.log("Sending: ", customer);
    router.push(
      `/customer/${customer.id}?firstName=${customer.customer.firstName}`
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
        {customer.vehicle.image ? (
          <Image
            source={{ uri: customer.vehicle.image }}
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
            {customer.customer.firstName} {customer.customer.lastName}
          </ThemedText>
          <ThemedText type={"extraSmall"}>
            {customer.vehicle.brand} {customer.vehicle.model}
            {customer.vehicle.buildYear && (
              <>
                {", "}
                {customer.vehicle.buildYear}
              </>
            )}
          </ThemedText>
          <ThemedText type={"extraSmall"}>{customer.vehicle.vin}</ThemedText>
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
