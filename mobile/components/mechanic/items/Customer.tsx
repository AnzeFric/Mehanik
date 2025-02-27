import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";
import ModalPrompt from "../modals/ModalPrompt";
import ModalTime from "../modals/ModalTime";
import { formatDate } from "@/constants/util";

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

export default function Customer({ customerData }: Props) {
  const [isRejectOpen, setIsRejectOpen] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isChangeOpen, setIsChangeOpen] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={AppStyles.smallText}>{customerData.name}</Text>
        <Text style={AppStyles.smallText}>{customerData.vehicle}</Text>
      </View>
      <Text style={[AppStyles.smallBoldText, styles.date]}>
        {formatDate(customerData.day)}
      </Text>
      <Text style={[AppStyles.smallText, styles.description]}>
        {customerData.description}
      </Text>

      <TouchableOpacity
        style={[styles.buttonAccept, styles.button]}
        onPress={() => setIsConfirmOpen(true)}
      >
        <Text style={styles.buttonText}>Potrdi</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonReject, styles.button]}
          onPress={() => setIsRejectOpen(true)}
        >
          <Text style={styles.buttonText}>Zavrni</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonChange, styles.button]}
          onPress={() => setIsChangeOpen(true)}
        >
          <Text style={styles.buttonText}>Spremeni</Text>
        </TouchableOpacity>
      </View>
      <ModalPrompt
        isVisible={isRejectOpen}
        message={"Ste prepričani, da želite zavrniti stranko?"}
        onCancel={() => setIsRejectOpen(false)}
        onConfirm={() => {}}
      />
      <ModalTime
        isVisible={isConfirmOpen}
        message={"To je modal okno za potrditev termina"}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {}}
      />
      <ModalTime
        isVisible={isChangeOpen}
        message={"To je modal okno za spremembo termina"}
        onCancel={() => setIsChangeOpen(false)}
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
  buttonAccept: {
    backgroundColor: Colors.light.confirmButton,
    alignSelf: "flex-end",
    marginVertical: 10,
  },
  buttonChange: { backgroundColor: Colors.light.inactiveButton },
  buttonText: {
    fontSize: 20,
    fontFamily: "Jaldi-Regular",
    color: Colors.light.darkButtonText,
  },
});
