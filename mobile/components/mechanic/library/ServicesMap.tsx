import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";

export interface Service {
  type: string;
}

interface Props {
  serviceList: Service[];
}
// TODO: expand Service interface, when you start saving to db
export default function ServicesMap({ serviceList }: Props) {
  return (
    <>
      <View style={styles.container}>
        <Text
          style={[
            AppStyles.title,
            {
              textAlignVertical: "bottom",
            },
          ]}
        >
          Narejeni servisi
        </Text>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
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
