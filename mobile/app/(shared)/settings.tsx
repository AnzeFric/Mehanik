import { View, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { useAuth } from "@/hooks/accounts/useAuth";
import { useUser } from "@/hooks/accounts/useUser";
import TitleRow from "@/components/shared/TitleRow";
import useUserStore from "@/stores/accounts/useUserStore";
import { useTheme } from "@/context/ThemeContext";
import ThemedScrollView from "@/components/global/themed/ThemedScrollView";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedButton from "@/components/global/themed/ThemedButton";
import ModalPrompt from "@/components/shared/modals/ModalPrompt";

export default function SettingsScreen() {
  const { handleLogout } = useAuth();
  const { deleteUser } = useUser();
  const { currentUser } = useUserStore();

  const { selectedTheme, setSelectedTheme } = useTheme();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleEditMechanic = () => {
    router.push("/(shared)/profile");
  };

  const handleDeleteUser = async () => {
    const success = await deleteUser();
    if (success) {
      router.replace("/(auth)/login");
    } else {
      Alert.alert(
        "Napaka",
        "Prišlo je do napake pri brisanju računa. Poskusite ponovno kasneje"
      );
    }
  };

  return (
    <ThemedScrollView>
      <TitleRow
        title={`Pozdravljen ${currentUser.firstName}!`}
        hasBackButton={true}
      />

      <View style={styles.container}>
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

        <ThemedText type={"normal"}>Pogoji uporabe</ThemedText>
        <ThemedButton
          buttonType={"small"}
          buttonText={"Preberi"}
          onPress={() => router.push("../terms")}
        />

        {currentUser.accountType === "mechanic" && (
          <View style={styles.itemContainer}>
            <View>
              <ThemedText type={"normal"}>Profil</ThemedText>
              <ThemedText type={"extraSmall"}>
                Podatki vidni strankam na seznamu mehanikov
              </ThemedText>
            </View>
            <ThemedButton
              buttonType={"small"}
              buttonText={"Uredi"}
              onPress={handleEditMechanic}
            />
          </View>
        )}
        <View style={styles.itemContainer}>
          <ThemedText type={"normal"}>Račun</ThemedText>
          <ThemedButton
            buttonType={"small"}
            buttonText={"Odjava"}
            onPress={handleLogout}
          />
          <ThemedButton
            buttonType={"small"}
            buttonText={"Odstrani"}
            onPress={() => setDeleteModal(true)}
          />
        </View>
      </View>
      <ModalPrompt
        isVisible={deleteModal}
        message={"Ste prepričani, da želite izbrisati račun?"}
        onConfirm={handleDeleteUser}
        onCancel={() => setDeleteModal(false)}
      />
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 25,
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
