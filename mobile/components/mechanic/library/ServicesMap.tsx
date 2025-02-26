import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export interface Service {
  type: string;
}

interface Props {
  serviceList: Service[];
}

export default function ServicesMap({ serviceList }: Props) {
  return (
    <View>
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
      <View style={styles.servicesContainer}>
        {serviceList.length > 0 ? (
          serviceList.map((service) => <Text>{service.type}</Text>)
        ) : (
          <Text style={styles.listEmptyText}>Nimate vnešenih servisov.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "Jaldi-Regular",
  },
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
  servicesContainer: {
    paddingTop: 20,
  },
  listEmptyText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Jaldi-Regular",
  },
});
