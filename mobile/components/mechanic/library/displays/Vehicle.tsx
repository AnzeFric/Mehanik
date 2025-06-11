import { View, Image, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";
import { VehicleData } from "@/interfaces/vehicle";
import ThemedText from "@/components/global/themed/ThemedText";

interface Props {
  vehicle: VehicleData;
}

export default function VehicleDisplay({ vehicle }: Props) {
  return (
    <View style={styles.container}>
      {vehicle.image ? (
        <Image source={{ uri: vehicle.image }} style={styles.image} />
      ) : (
        <Image
          source={require("@/assets/images/logo-main.png")}
          style={styles.image}
        />
      )}

      <ThemedText style={AppStyles.title}>Podatki o vozilu</ThemedText>
      <View>
        <ThemedText style={AppStyles.text}>
          {vehicle.brand} {vehicle.model}
          {vehicle.buildYear && (
            <>
              {", "}
              {vehicle.buildYear}
            </>
          )}
        </ThemedText>
        <ThemedText style={AppStyles.boldText}>{vehicle.vin}</ThemedText>
      </View>
      {vehicle.description && (
        <ThemedText style={AppStyles.smallText}>
          {vehicle.description}
        </ThemedText>
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
