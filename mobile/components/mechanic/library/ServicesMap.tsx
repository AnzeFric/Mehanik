import { Text, View, StyleSheet } from "react-native";
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
  servicesContainer: {
    paddingTop: 20,
    gap: 10,
  },
  listEmptyText: {
    textAlign: "center",
  },
});
