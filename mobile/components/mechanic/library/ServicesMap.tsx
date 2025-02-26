import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";

export interface Service {
  type: string;
}

interface Props {
  serviceList: Service[];
}

export default function ServicesMap({ serviceList }: Props) {
  return (
    <View>
      <Text style={AppStyles.title}>Narejeni servisi</Text>
      <View style={styles.buttonsContainer}>
        <TouchableHighlight
          style={styles.button}
          underlayColor={Colors.light.underlayColor}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          underlayColor={Colors.light.underlayColor}
          onPress={() => {}}
        >
          <Text style={styles.buttonText}>Sortiraj</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.servicesContainer}>
        {serviceList.length > 0 ? (
          serviceList.map((service) => <Text>{service.type}</Text>)
        ) : (
          <Text style={[AppStyles.smallText, styles.listEmptyText]}>
            Nimate vnešenih servisov.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  buttonText: {
    fontSize: 16,
    fontFamily: "Jaldi-Regular",
    color: "white",
    textAlign: "center",
  },
  servicesContainer: {
    paddingTop: 40,
  },
  listEmptyText: {
    textAlign: "center",
  },
});
