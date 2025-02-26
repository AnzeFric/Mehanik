import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { AppStyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import BackIcon from "@/assets/icons/BackIcon.svg";
import VehicleData from "@/components/mechanic/library/VehicleData";
import ServicesMap, {
  Service,
} from "@/components/mechanic/library/ServicesMap";

export default function DetailServiceScreen() {
  const { id } = useLocalSearchParams();
  const [serviceList, setServiceList] = useState<Array<Service>>([]);
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
      <VehicleData
        imageUri={""}
        brandAndSeries={"Volkswagen Golf"}
        year={2009}
        description={"Nek dodaten opis"}
        vin={"A71239SASFV"}
      />
      <ServicesMap serviceList={serviceList} />
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
});
