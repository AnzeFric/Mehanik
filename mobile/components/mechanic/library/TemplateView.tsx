import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import BackIcon from "@/assets/icons/BackIcon.svg";
import { router } from "expo-router";
import React from "react";

interface TemplateScreenProps {
  title: string;
  children: React.ReactNode;
  buttonText: string;
  onButtonPress: () => void;
}

/* This is a template view for adding and editing customer and service data in mechanic library
   It displays a header with the intended action(ex: Dodaj servis) and a button in the footer to confirm the action */
export default function TemplateView({
  title,
  children,
  buttonText,
  onButtonPress,
}: TemplateScreenProps) {
  return (
    <View style={[AppStyles.parentPadding, styles.container]}>
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
      </View>

      <View>{children}</View>

      <TouchableHighlight
        style={[AppStyles.button, styles.button]}
        onPress={onButtonPress}
        underlayColor={Colors.light.specialBlueClick}
      >
        <Text style={[AppStyles.buttonText, styles.buttonText]}>
          {buttonText}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
    flex: 1,
  },
  header: {
    borderBottomColor: Colors.light.inactiveBorder,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "dashed",
  },
  userName: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: "Jaldi-Regular",
    flex: 1,
    textAlign: "center",
  },
  button: {
    paddingVertical: 0,
  },
  buttonText: {
    lineHeight: 40,
  },
});
