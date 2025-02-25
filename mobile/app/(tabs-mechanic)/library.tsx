import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { AppStyles } from "@/constants/Styles";
import Services from "@/components/mechanic/library/Services";

export interface ServiceData {
  name: string;
  image: string;
  vehicle: string;
  vin: string;
}

export default function LibraryScreen() {
  const [serviceList, setServiceList] = useState<Array<ServiceData>>([]);

  return (
    <View style={AppStyles.parentPadding}>
      <Text style={styles.title}>Knjižnica servisov</Text>
      <Services serviceList={serviceList} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily: "Jaldi-Regular",
  },
});
