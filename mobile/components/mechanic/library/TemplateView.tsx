import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AppStyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import BackIcon from "@/assets/icons/BackIcon.svg";
import { router } from "expo-router";
import React from "react";

interface TemplateScreenProps {
  title: string;
  menuIcon?: React.ReactNode;
  children: React.ReactNode;
  buttonText: string;
  onButtonPress: () => void;
}

/* This is a template view for adding/editing customer/service data in the mechanic library
   It displays a header with the intended action(ex: Add Service) and a button in the footer to confirm the action */
export default function TemplateView({
  title,
  menuIcon,
  children,
  buttonText,
  onButtonPress,
}: TemplateScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackIcon
          height={30}
          width={30}
          style={{ alignSelf: "flex-start" }}
          onPress={() => {
            router.back();
          }}
        />
        <Text style={styles.userName}>{title}</Text>
        {menuIcon && <View>{menuIcon}</View>}
      </View>
      <ScrollView style={styles.childrenContainer}>
        {children}
        <TouchableHighlight
          style={[AppStyles.button, styles.button]}
          onPress={onButtonPress}
          underlayColor={Colors.light.specialBlueClick}
        >
          <Text style={[AppStyles.buttonText, styles.buttonText]}>
            {buttonText}
          </Text>
        </TouchableHighlight>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    borderBottomColor: Colors.light.inactiveBorder,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "dashed",
    paddingTop: 20,
    marginHorizontal: 25,
  },
  userName: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: "Jaldi-Regular",
    flex: 1,
    textAlign: "center",
  },
  childrenContainer: {
    flex: 1,
  },
  button: {
    paddingVertical: 0,
    marginHorizontal: 25,
    marginBottom: 25,
  },
  buttonText: {
    lineHeight: 40,
  },
});
