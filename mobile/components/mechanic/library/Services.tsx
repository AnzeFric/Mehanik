import { View, Text, StyleSheet } from "react-native";
import { ServiceData } from "@/app/(tabs-mechanic)/library";
import Service from "./items/Service";

interface Props {
  serviceList: ServiceData[];
}

export default function Services({ serviceList }: Props) {
  return (
    <View>
      {serviceList.length > 0 ? (
        serviceList.map((service, index) => (
          <Service serviceData={service} key={index} />
        ))
      ) : (
        <Text style={styles.text}>Nimate vnešenih servisov.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: "Jaldi-Regular",
    textAlign: "center",
  },
});
