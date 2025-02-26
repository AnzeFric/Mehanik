import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useCallback } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import VehicleData from "@/components/mechanic/library/VehicleData";
import ServicesMap, {
  Service,
} from "@/components/mechanic/library/ServicesMap";
import TemplateView from "@/components/mechanic/library/TemplateView";

export default function DetailServiceScreen() {
  const { id } = useLocalSearchParams();
  const [serviceList, setServiceList] = useState<Array<Service>>([]);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  // TODO: Get user data from database using id

  // CallBack for screen closing
  useFocusEffect(
    useCallback(() => {
      setIsMenuVisible(false);
    }, [])
  );

  const handlePress = () => {
    router.push(`/(tabs-mechanic)/library/service-add/${id}`);
  };

  const menuIcon: React.ReactNode = (
    <MenuIcon
      height={30}
      width={30}
      style={{ alignSelf: "flex-start" }}
      onPress={() => {
        setIsMenuVisible(!isMenuVisible);
      }}
    />
  );

  return (
    <TemplateView
      title={`Oseba ${id}`}
      buttonText={"Dodaj"}
      onButtonPress={handlePress}
      menuIcon={menuIcon}
    >
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
      <VehicleData
        imageUri={""}
        brandAndSeries={"Volkswagen Golf"}
        year={2009}
        description={"Nek dodaten opis"}
        vin={"A71239SASFV"}
      />
      <ServicesMap serviceList={serviceList} />
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    right: 0,
    top: -20,
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
