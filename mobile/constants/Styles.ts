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
});
