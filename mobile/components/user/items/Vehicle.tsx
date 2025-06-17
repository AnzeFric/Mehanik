import { View, Image, StyleSheet } from "react-native";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import { VehicleData } from "@/interfaces/vehicle";

interface Props {
  vehicle: VehicleData;
}

export default function Vehicle({ vehicle }: Props) {
  const { staticColors } = useAnimatedTheme();

  return (
    <ThemedView
      type={"secondary"}
      style={[styles.container, { borderLeftColor: staticColors.specialBlue }]}
    >
      {vehicle.image ? (
        <Image source={{ uri: vehicle.image }} style={styles.image} />
      ) : (
        <Image
          source={require("@/assets/logo-main.png")}
          style={styles.image}
        />
      )}
      <View style={{ flex: 1 }}>
        <ThemedText type={"small"} bold>
          {vehicle.brand} {vehicle.model}
          {vehicle.buildYear && (
            <>
              {", "}
              {vehicle.buildYear}
            </>
          )}
        </ThemedText>
        <ThemedText type={"extraSmall"}>{vehicle.vin}</ThemedText>
        {vehicle.description && (
          <ThemedText type={"extraSmall"}>{vehicle.description}</ThemedText>
        )}
      </View>
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
