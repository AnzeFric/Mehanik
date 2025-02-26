import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";
import ModalReject from "../modals/ModalReject";

export interface CustomerData {
  id: number;
  name: string;
  vehicle: string;
  day: Date;
  description: string;
}

interface Props {
  customerData: CustomerData;
}

/* TODO: onClick funkcionalnosti za potrdi in spremeni odpreta modal okno za vpis časa/datuma v tabelo na home
         Datum prikaži v slovenski obliki */
export default function Customer({ customerData }: Props) {
  const [isRejectOpen, setIsRejectOpen] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={AppStyles.smallText}>{customerData.name}</Text>
        <Text style={AppStyles.smallText}>{customerData.vehicle}</Text>
      </View>
      <Text style={[AppStyles.smallBoldText, styles.date]}>
        {customerData.day.toDateString()}
      </Text>
      <Text style={[AppStyles.smallText, styles.description]}>
        {customerData.description}
      </Text>
      <TouchableOpacity style={[styles.buttonChange, styles.button]}>
        <Text style={styles.buttonText}>Predlagaj spremembo</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonReject, styles.button]}
          onPress={() => setIsRejectOpen(true)}
        >
          <Text style={styles.buttonText}>Zavrni</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonAccept, styles.button]}>
          <Text style={styles.buttonText}>Potrdi</Text>
        </TouchableOpacity>
      </View>
      <ModalReject
        isVisible={isRejectOpen}
        message={"Ste prepričani, da želite zavrniti stranko?"}
        onCancel={() => setIsRejectOpen(false)}
        onConfirm={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.light.inactiveBorder,
    borderRadius: 10,
    padding: 20,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    textAlign: "right",
  },
  description: {
    paddingVertical: 10,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    elevation: 1,
  },
  buttonReject: { backgroundColor: Colors.light.cancelButton },
  buttonChange: {
    backgroundColor: Colors.light.inactiveButton,
    alignSelf: "flex-end",
    marginVertical: 10,
  },
  buttonAccept: { backgroundColor: Colors.light.confirmButton },
  buttonText: {
    fontSize: 20,
    fontFamily: "Jaldi-Regular",
    color: Colors.light.darkButtonText,
  },
});
