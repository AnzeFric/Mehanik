import { Text, View, Image, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";

interface Props {
  imageUri: string;
  brandAndSeries: string;
  year: number;
  description: string;
  vin: string;
}

export default function VehicleData({
  imageUri,
  brandAndSeries,
  year,
  description,
  vin,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo-main.png")}
        style={styles.image}
      />
      <Text style={AppStyles.title}>Podatki o vozilu</Text>
      <View>
        <Text style={AppStyles.text}>
          {brandAndSeries}, {year}
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
