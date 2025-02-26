import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useState, useCallback } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { AppStyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import BackIcon from "@/assets/icons/BackIcon.svg";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import VehicleData from "@/components/mechanic/library/VehicleData";
import ServicesMap, {
  Service,
} from "@/components/mechanic/library/ServicesMap";

export default function DetailServiceScreen() {
  const { id } = useLocalSearchParams();
  const [serviceList, setServiceList] = useState<Array<Service>>([]);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  // TODO: Get user data from database using id

  // Hide menu upon closing screen
  useFocusEffect(
    useCallback(() => {
      setIsMenuVisible(false);
    }, [])
  );

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
        <MenuIcon
          height={30}
          width={30}
          style={{ alignSelf: "flex-start" }}
          onPress={() => {
            setIsMenuVisible(!isMenuVisible);
          }}
        />
        {isMenuVisible && (
          <View style={styles.menuContainer}>
            <TouchableOpacity
              onPress={() => router.push(`/library/customer-edit/${id}`)}
            >
              <Text style={[styles.menuItem, styles.menuItemTop]}>UREDI</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.menuItem}>IZBRIŠI</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <VehicleData
        imageUri={""}
        brandAndSeries={"Volkswagen Golf"}
        year={2009}
        description={"Nek dodaten opis"}
        vin={"A71239SASFV"}
      />
      <ServicesMap serviceList={serviceList} />
      <TouchableHighlight
        style={[AppStyles.button, styles.button]}
        onPress={() => {
          router.push(`/(tabs-mechanic)/library/service-add/${id}`);
        }}
        underlayColor={Colors.light.specialBlueClick}
      >
        <Text style={[AppStyles.buttonText, styles.buttonText]}>Dodaj</Text>
      </TouchableHighlight>
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
  button: { paddingVertical: 0 },
  buttonText: {
    lineHeight: 40,
  },
  menuContainer: {
    position: "absolute",
    right: 0,
    top: 40,
    backgroundColor: Colors.light.background,
    width: 200,
    borderRadius: 8,
    shadowColor: Colors.light.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5,
  },
  menuItem: {
    textAlign: "center",
    paddingVertical: 12,
    fontSize: 18,
    fontFamily: "Jaldi-Bold",
  },
  menuItemTop: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
  },
});
