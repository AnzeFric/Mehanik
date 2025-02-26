import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { AppStyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import BackIcon from "@/assets/icons/BackIcon.svg";

export default function DetailServiceScreen() {
  const { id } = useLocalSearchParams();
  // TODO: Get user data from database using id

  return (
    <View style={[AppStyles.parentPadding, styles.container]}>
      <View style={styles.header}>
        <BackIcon
          height={30}
          width={30}
          style={{ alignSelf: "flex-start" }}
          onPress={() => {
            router.back();
          }}
        />
        <Text style={styles.userName}>Oseba {id}</Text>
      </View>
      <View>
        <Image
          source={require("@/assets/images/logo-main.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Podatki o vozilu</Text>
        <Text>Škoda Octavia</Text>
        <Text>
          Nek dodaten opis glede vozila. Morda TDI/TSI, dizel, bencin. Karkoli
          bo mehanik želel
        </Text>
        <Text>VIN številka</Text>
      </View>
      <View style={styles.servicesContainer}>
        <Text style={styles.title}>Narejeni servisi</Text>
        <View style={styles.buttonsContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor={Colors.light.underlayColor}
            onPress={() => {}}
          >
            <Text style={styles.text}>Filter</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor={Colors.light.underlayColor}
            onPress={() => {}}
          >
            <Text style={styles.text}>Sortiraj</Text>
          </TouchableHighlight>
        </View>
        <Text>Prikaz vseh servisov</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  header: {
    borderBottomColor: Colors.light.inactiveBorder,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "dashed",
  },
  userName: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: "Jaldi-Regular",
    flex: 1,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 250,
  },
  title: {
    fontSize: 24,
    fontFamily: "Jaldi-Regular",
  },
  servicesContainer: {},
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignSelf: "flex-end",
  },
  button: {
    backgroundColor: Colors.light.utilityButton,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 16,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontFamily: "Jaldi-Regular",
    color: "white",
    textAlign: "center",
  },
});
