import { View, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import TitleRow from "@/components/global/TitleRow";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedButton from "@/components/global/themed/ThemedButton";

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

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ y: 0 });
        }
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
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
        {buttonText ? (
          <ThemedButton
            buttonType={"small"}
            buttonText={buttonText}
            onPress={onButtonPress}
            buttonStyle={{ marginVertical: 20 }}
          />
        ) : (
          <View style={{ marginVertical: 20 }} />
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
    gap: 15,
  },
});
