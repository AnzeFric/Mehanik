import { View, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { AppStyles } from "@/constants/Styles";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import TitleRow from "@/components/shared/TitleRow";
import useUserStore from "@/stores/useUserStore";
import { useTheme } from "@/context/ThemeContext";
import ThemedScrollView from "@/components/global/themed/ThemedScrollView";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedButton from "@/components/global/themed/ThemedButton";

export default function SettingsScreen() {
  const { handleLogout } = useAuth();
  const { deleteUser } = useUser();
  const { currentUser } = useUserStore();

  const { selectedTheme, setSelectedTheme } = useTheme();

  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(true);

  const handleDeleteUser = () => {
    Alert.alert("Brisanje računa", "Ste prepričani?", [
      {
        text: "Zavrni",
      },
      {
        text: "Potrdi",
        onPress: () => deleteUser,
      },
    ]);
  };

  const handleEditMechanic = () => {
    router.push("/(shared)/profile");
  };

  return (
    <ThemedScrollView>
      <TitleRow
        title={`Pozdravljen ${currentUser.firstName}!`}
        hasBackButton={true}
      />

      <View style={[AppStyles.parentPadding, styles.contentContainer]}>
        <View style={styles.itemContainer}>
          <ThemedText type={"normal"}>Barva aplikacije</ThemedText>
          <View style={styles.optionContainer}>
            <ThemedButton
              buttonType={"small"}
              buttonText={"Svetla"}
              onPress={() => setSelectedTheme("light")}
              selected={selectedTheme === "light"}
              buttonStyle={styles.optionButton}
            />
            <ThemedButton
              buttonType={"small"}
              buttonText={"Temna"}
              onPress={() => setSelectedTheme("dark")}
              selected={selectedTheme === "dark"}
              buttonStyle={styles.optionButton}
            />
          </View>
        </View>

        <View style={styles.itemContainer}>
          <ThemedText type={"normal"}>Obvestila</ThemedText>
          <View style={styles.optionContainer}>
            <ThemedButton
              buttonType={"small"}
              buttonText={"Vklopljeno"}
              onPress={() => setNotificationsEnabled(true)}
              selected={notificationsEnabled}
              buttonStyle={styles.optionButton}
            />
            <ThemedButton
              buttonType={"small"}
              buttonText={"Izklopljeno"}
              onPress={() => setNotificationsEnabled(false)}
              selected={!notificationsEnabled}
              buttonStyle={styles.optionButton}
            />
          </View>
        </View>

        <View style={styles.itemContainer}>
          <ThemedText type={"normal"}>Pogoji uporabe</ThemedText>
          <ThemedButton
            buttonType={"small"}
            buttonText={"Preberi"}
            onPress={() => router.push("../terms")}
          />
        </View>

        {currentUser.accountType === "mechanic" && (
          <View style={styles.itemContainer}>
            <View style={styles.itemContainer}>
              <View>
                <ThemedText type={"normal"}>Javni profil</ThemedText>
                <ThemedText type={"small"}>
                  Podatke vidijo stranke na seznamu mehanikov
                </ThemedText>
              </View>
              <ThemedButton
                buttonType={"small"}
                buttonText={"Uredi"}
                onPress={handleEditMechanic}
              />
            </View>
          </View>
        )}
        <View style={styles.itemContainer}>
          <View style={styles.itemContainer}>
            <ThemedText type={"normal"}>Račun</ThemedText>
            <ThemedButton
              buttonType={"small"}
              buttonText={"Odjava"}
              onPress={handleLogout}
            />
          </View>
          <View>
            <ThemedButton
              buttonType={"small"}
              buttonText={"Odstrani"}
              onPress={handleDeleteUser}
            />
          </View>
        </View>
      </View>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
    gap: 20,
  },
  itemContainer: {
    gap: 10,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
});
