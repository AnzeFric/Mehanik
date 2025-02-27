import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { formatDate, formatServiceType } from "@/constants/util";
import { AppStyles } from "@/constants/Styles";

export interface ServiceData {
  id: number;
  date: string;
  serviceType: "small" | "large" | "other";
  serviceItems?: {
    oilChange?: boolean;
    filterChange?: boolean;
    brakeCheck?: boolean;
    tireRotation?: boolean;
    fluidCheck?: boolean;
    batteryCheck?: boolean;
    sparkPlugs?: boolean;
    airFilter?: boolean;
    cabinFilter?: boolean;
    suspension?: boolean;
    timing?: boolean;
    coolant?: boolean;
  };
  serviceNotes?: string;
  serviceImages?: string[];
  servicePrice?: string;

  // Custom service (type is "other")
  customServiceDescription?: string;
}

interface Props {
  serviceData: ServiceData;
}

export default function Service({ serviceData }: Props) {
  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor={Colors.light.underlayColor}
      onPress={() => {}}
    >
      <>
        <View style={styles.titleContainer}>
          <Text style={[AppStyles.title, styles.title]}>
            {formatServiceType(serviceData.serviceType)}
          </Text>

          <Text style={AppStyles.smallBoldText}>
            {formatDate(new Date(serviceData.date))}
          </Text>
        </View>
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
