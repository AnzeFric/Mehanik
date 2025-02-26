import { Text, View, Image, StyleSheet } from "react-native";

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
    <View>
      <Image
        source={require("@/assets/images/logo-main.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Podatki o vozilu</Text>
      <Text style={styles.text}>
        {brandAndSeries}, {year}
      </Text>
      <Text style={styles.boldText}>{vin}</Text>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
  },
  title: {
    fontSize: 24,
    fontFamily: "Jaldi-Regular",
  },
  text: {
    fontSize: 20,
    fontFamily: "Jaldi-Regular",
    lineHeight: 28,
  },
  boldText: {
    fontSize: 20,
    fontFamily: "Jaldi-Bold",
    lineHeight: 24,
    paddingBottom: 10,
  },
});
