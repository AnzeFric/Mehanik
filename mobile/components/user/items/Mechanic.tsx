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
import { MechanicData } from "@/interfaces/user";

interface Props {
  mechanicData: MechanicData;
}

export default function Mechanic({ mechanicData }: Props) {
  const handlePress = () => {
    router.push(`/(tabs-user)/mechanic/${mechanicData.id}`);
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
          <Text style={AppStyles.boldTitle}>
            {mechanicData.firstName} {mechanicData.lastName}
          </Text>
          <Text style={AppStyles.smallText}>
            {mechanicData?.address} {mechanicData?.city}
          </Text>
          <Text style={AppStyles.smallText}>{mechanicData?.phoneNumber}</Text>
          <Text style={AppStyles.smallText}>{mechanicData?.email}</Text>
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
    gap: 3,
  },
});
