import { View, Image, StyleSheet } from "react-native";
import { VehicleData } from "@/interfaces/vehicle";
import ThemedText from "@/components/global/themed/ThemedText";
import { useTranslation } from "react-i18next";

interface Props {
  vehicle: VehicleData;
}

export default function VehicleDisplay({ vehicle }: Props) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {vehicle.image ? (
        <Image source={{ uri: vehicle.image }} style={styles.image} />
      ) : (
        <Image
          source={require("@/assets/logo-main.png")}
          style={styles.image}
        />
      )}

      <ThemedText type={"title"}>
        {t("components.mechanic.displays.vehicleTitle")}
      </ThemedText>
      <View>
        <ThemedText type={"normal"}>
          {vehicle.brand} {vehicle.model}
          {vehicle.buildYear && (
            <>
              {", "}
              {vehicle.buildYear}
            </>
          )}
        </ThemedText>
        <ThemedText type={"normal"} bold>
          {vehicle.vin}
        </ThemedText>
      </View>
      {vehicle.description && (
        <ThemedText type={"small"}>{vehicle.description}</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  image: {
    width: "100%",
    height: 250,
  },
});
