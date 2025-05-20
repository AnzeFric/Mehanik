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
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
  },
  smallText: {
    fontSize: 16,
  },
  text: {
    fontSize: 20,
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  smallBoldText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  boldText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bigTitle: {
    fontSize: 32,
  },
});
