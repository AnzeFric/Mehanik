import { Text, View, Image, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";

interface Props {
  imageUri: string | undefined | null;
  brand: string | undefined;
  model: string | undefined;
  year: number | undefined;
  description: string | undefined | null;
  vin: string | undefined;
}

export default function VehicleData({
  imageUri,
  brand,
  model,
  year,
  description,
  vin,
}: Props) {
  return (
    <View style={styles.container}>
      {imageUri === undefined ? (
        <Image
          source={require("@/assets/images/logo-main.png")}
          style={styles.image}
        />
      ) : (
        // TODO: Load image dynamically from backedn
        <Image
          source={require("@/assets/images/logo-main.png")}
          style={styles.image}
        />
      )}

      <Text style={AppStyles.title}>Podatki o vozilu</Text>
      <View>
        <Text style={AppStyles.text}>
          {brand} {model}
          {", "}
          {year}
        </Text>
        <Text style={AppStyles.boldText}>{vin}</Text>
      </View>
      <Text style={AppStyles.text}>{description}</Text>
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
