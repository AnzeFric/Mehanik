import { Text, View, Image, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";
import { VehicleData } from "@/interfaces/customer";

interface Props {
  vehicle: VehicleData;
}

export default function VehicleDisplay({ vehicle }: Props) {
  return (
    <View style={styles.container}>
      {vehicle.image ? (
        // TODO: Load image dynamically from backend
        <Image
          source={require("@/assets/images/logo-main.png")}
          style={styles.image}
        />
      ) : (
        <Image
          source={require("@/assets/images/logo-main.png")}
          style={styles.image}
        />
      )}

      <Text style={AppStyles.title}>Podatki o vozilu</Text>
      <View>
        <Text style={AppStyles.text}>
          {vehicle.brand} {vehicle.model}
          {", "}
          {vehicle.buildYear}
        </Text>
        <Text style={AppStyles.boldText}>{vehicle.vin}</Text>
      </View>
      <Text style={AppStyles.text}>{vehicle.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  image: {
    width: "100%",
    height: 250,
  },
});
