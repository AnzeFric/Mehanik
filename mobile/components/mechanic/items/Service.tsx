import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";

export interface ServiceData {
  id: number;
  name: string;
  image: string;
  vehicle: string;
  year: number;
  vin: string;
}

interface Props {
  serviceData: ServiceData;
  setSearch: (text: string) => void;
}

export default function Service({ serviceData, setSearch }: Props) {
  const handlePress = () => {
    setSearch("");
    router.push(`/library/${serviceData.id}`);
  };

  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor={Colors.light.underlayColor}
      onPress={handlePress}
    >
      <>
        <Image
          source={require("@/assets/images/logo-main.png")}
          style={styles.image}
        />
        <View style={styles.customerInfo}>
          <Text style={AppStyles.boldTitle}>{serviceData.name}</Text>
          <Text style={AppStyles.smallText}>
            {serviceData.vehicle}, {serviceData.year}
          </Text>
          <Text style={AppStyles.smallText}>{serviceData.vin}</Text>
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
});
