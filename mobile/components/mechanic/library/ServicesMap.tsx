import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";
import Service from "../items/Service";
import { ServiceData } from "@/interfaces/mechanic";

interface Props {
  serviceList: ServiceData[];
}

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
          serviceList.map((service, index) => (
            <Service serviceData={service} key={index} />
          ))
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
    color: "white",
    textAlign: "center",
  },
  servicesContainer: {
    paddingTop: 20,
    gap: 10,
  },
  listEmptyText: {
    textAlign: "center",
  },
});
