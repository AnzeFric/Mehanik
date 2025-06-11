import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AppStyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import TitleRow from "@/components/shared/TitleRow";
import ThemedView from "@/components/global/themed/ThemedView";

interface TemplateScreenProps {
  title: string;
  children: React.ReactNode;
  backButton: boolean;
  buttonText?: string;
  onButtonPress?: (...args: any[]) => void;
  isMenuVisible?: boolean;
  menu?: React.ReactNode;
  menuIcon?: React.ReactNode;
}

/* Displays a fixed header(optional menu button) and an optional button in the footer to confirm the action. If there is no button leave the buttonText empty */
export default function TemplateView({
  title,
  children,
  backButton,
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
    <ThemedView type={"background"} style={styles.container}>
      <TitleRow
        title={title}
        hasBackButton={backButton}
        menuButton={menuIcon}
      />
      <View>{isMenuVisible && menu}</View>
      <ScrollView style={styles.childrenContainer} ref={scrollRef}>
        {children}
        {buttonText ? (
          <TouchableOpacity
            style={[AppStyles.button, styles.button]}
            onPress={onButtonPress}
          >
            <Text style={AppStyles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.button} />
        )}
      </ScrollView>
    </ThemedView>
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
    marginHorizontal: 25,
    marginBottom: 25,
  },
});
