import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const AppStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  parentPadding: {
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.light.textInputBorder,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    fontFamily: "Jaldi-Regular",
    backgroundColor: Colors.light.textInputBackground,
  },
  button: {
    backgroundColor: Colors.light.specialBlue,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: Colors.light.darkButtonText,
    fontSize: 24,
    lineHeight: 24,
    fontFamily: "Jaldi-Bold",
  },
  title: {
    fontSize: 24,
    fontFamily: "Jaldi-Regular",
    lineHeight: 29,
  },
  smallText: {
    fontSize: 16,
    fontFamily: "Jaldi-Regular",
    lineHeight: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: "Jaldi-Regular",
    lineHeight: 24,
  },
  boldTitle: {
    fontSize: 24,
    fontFamily: "Jaldi-Bold",
    lineHeight: 28,
  },
  smallBoldText: {
    fontSize: 16,
    fontFamily: "Jaldi-Bold",
    lineHeight: 20,
  },
  boldText: {
    fontSize: 20,
    fontFamily: "Jaldi-Bold",
    lineHeight: 24,
  },
  bigTitle: {
    fontSize: 32,
    fontFamily: "Jaldi-Regular",
  },
});
