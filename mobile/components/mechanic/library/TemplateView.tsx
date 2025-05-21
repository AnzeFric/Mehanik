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
import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import TitleRow from "@/components/shared/TitleRow";

interface TemplateScreenProps {
  title: string;
  children: React.ReactNode;
  buttonText?: string;
  onButtonPress?: () => void;
  isMenuVisible?: boolean;
  menu?: React.ReactNode;
  menuIcon?: React.ReactNode;
}

/* Displays a fixed header(optional menu button) and an optional button in the footer to confirm the action. If there is no button leave the buttonText empty */
export default function TemplateView({
  title,
  children,
  buttonText,
  onButtonPress = () => {},
  isMenuVisible,
  menu,
  menuIcon,
}: TemplateScreenProps) {
  const scrollRef = useRef<ScrollView>(null);

  // Make ScrollView return to top after screen is unfocused
  useFocusEffect(
    useCallback(() => {
      return () => {
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ y: 0 });
          }
        }, 100); // For smooth transition between screens
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <TitleRow title={title} hasBackButton={true} menuButton={menuIcon} />
      <View>{isMenuVisible && menu}</View>
      <ScrollView style={styles.childrenContainer} ref={scrollRef}>
        {children}
        {buttonText ? (
          <TouchableHighlight
            style={[AppStyles.button, styles.button]}
            onPress={onButtonPress}
            underlayColor={Colors.light.specialBlueClick}
          >
            <Text style={AppStyles.buttonText}>{buttonText}</Text>
          </TouchableHighlight>
        ) : (
          <View style={styles.button} />
        )}
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
});
