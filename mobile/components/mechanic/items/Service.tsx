import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

export interface ServiceData {
  id: number;
  name: string;
  image: string;
  vehicle: string;
  vin: string;
}

interface Props {
  serviceData: ServiceData;
}

export default function Service({ serviceData }: Props) {
  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor={Colors.light.underlayColor}
      onPress={() => {
        router.push(`/library/${serviceData.id}`);
      }}
    >
      <>
        <Image
          source={require("@/assets/images/logo-main.png")}
          style={styles.image}
        />
        <View style={styles.customerInfo}>
          <Text style={styles.textBold}>{serviceData.name}</Text>
          <Text style={styles.text}>{serviceData.vehicle}</Text>
          <Text style={styles.text}>{serviceData.vin}</Text>
        </View>
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.light.inactiveBorder,
    borderRadius: 10,
    padding: 20,
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 8,
  },
  customerInfo: {
    gap: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Jaldi-Regular",
  },
  textBold: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: "Jaldi-Bold",
  },
});
