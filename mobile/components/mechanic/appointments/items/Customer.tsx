import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CustomerData } from "@/app/(tabs-mechanic)/appointments";
import { Colors } from "@/constants/Colors";

interface Props {
  customerData: CustomerData;
}

export default function Customer({ customerData }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.text}>{customerData.name}</Text>
        <Text style={styles.text}>{customerData.vehicle}</Text>
      </View>
      <Text style={styles.date}>{customerData.day.toDateString()}</Text>
      <Text style={styles.description}>{customerData.description}</Text>
      <TouchableOpacity style={[styles.buttonChange, styles.button]}>
        <Text style={styles.buttonText}>Predlagaj spremembo</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.buttonReject, styles.button]}>
          <Text style={styles.buttonText}>Zavrni</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonAccept, styles.button]}>
          <Text style={styles.buttonText}>Potrdi</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 16,
    fontFamily: "Jaldi-Bold",
  },
  description: {
    fontSize: 16,
    fontFamily: "Jaldi-Regular",
    lineHeight: 20,
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: "Jaldi-Regular",
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
