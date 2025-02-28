import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import {
  formatDate,
  formatServiceType,
  formatCurrency,
} from "@/constants/util";
import { AppStyles } from "@/constants/Styles";
import { ServiceData } from "@/interfaces/mechanic";

interface Props {
  serviceData: ServiceData;
}

export default function Service({ serviceData }: Props) {
  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor={Colors.light.underlayColor}
      onPress={() => {
        router.push(
          `/(tabs-mechanic)/library/service-detail/${serviceData.id}`
        );
      }}
    >
      <>
        <View style={styles.titleContainer}>
          <Text style={[AppStyles.title, styles.title]}>
            {formatServiceType(serviceData.serviceType)}
          </Text>
          <Text style={AppStyles.text}>
            {formatCurrency(serviceData.servicePrice)}
          </Text>
        </View>
        <Text style={AppStyles.smallBoldText}>
          {formatDate(new Date(serviceData.date))}
        </Text>
        {serviceData.serviceType === "other" && (
          <Text style={AppStyles.text}>
            {serviceData.customServiceDescription}
          </Text>
        )}
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: Colors.light.inactiveBorder,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    lineHeight: 30,
  },
});
