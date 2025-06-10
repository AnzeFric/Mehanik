import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { AppStyles } from "@/constants/Styles";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import TitleRow from "@/components/shared/TitleRow";
import useUserStore from "@/stores/useUserStore";
import { useTheme } from "@/context/ThemeContext";
import ThemedScrollView from "@/components/global/themed/ThemedScrollView";

export default function SettingsScreen() {
  const { handleLogout } = useAuth();
  const { deleteUser } = useUser();
  const { currentUser } = useUserStore();

  const { selectedTheme, setSelectedTheme } = useTheme();

  const [isNotificationOn, setIsNotificationOn] = useState<boolean>(true);

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
          <Text style={AppStyles.text}>Barva aplikacije</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedTheme === "light" && styles.selectedButton,
              ]}
              onPress={() => setSelectedTheme("light")}
            >
              <Text style={AppStyles.buttonText}>Svetla</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedTheme === "dark" && styles.selectedButton,
              ]}
              onPress={() => setSelectedTheme("dark")}
            >
              <Text style={AppStyles.buttonText}>Temna</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <Text style={AppStyles.text}>Obvestila</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                isNotificationOn && styles.selectedButton,
              ]}
              onPress={() => setIsNotificationOn(true)}
            >
              <Text style={AppStyles.buttonText}>Vklopljeno</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                !isNotificationOn && styles.selectedButton,
              ]}
              onPress={() => setIsNotificationOn(false)}
            >
              <Text style={AppStyles.buttonText}>Izklopljeno</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <Text style={AppStyles.text}>Pogoji uporabe</Text>
          <TouchableOpacity
            style={AppStyles.button}
            onPress={() => router.push("../terms")}
          >
            <Text style={AppStyles.buttonText}>Preberi</Text>
          </TouchableOpacity>
        </View>

        {currentUser.accountType === "mechanic" && (
          <View style={styles.itemContainer}>
            <View style={styles.itemContainer}>
              <View>
                <Text style={AppStyles.text}>Javni profil</Text>
                <Text style={AppStyles.smallText}>
                  Podatke vidijo stranke na seznamu mehanikov
                </Text>
              </View>
              <TouchableOpacity
                style={AppStyles.button}
                onPress={handleEditMechanic}
              >
                <Text style={AppStyles.buttonText}>Uredi</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.itemContainer}>
          <View style={styles.itemContainer}>
            <Text style={AppStyles.text}>Račun</Text>
            <TouchableOpacity style={AppStyles.button} onPress={handleLogout}>
              <Text style={AppStyles.buttonText}>Odjava</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={AppStyles.button}
              onPress={handleDeleteUser}
            >
              <Text style={AppStyles.buttonText}>Odstrani</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomColor: Colors.light.inactiveBorder,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "dashed",
  },
  greeting: {
    fontSize: 32,
    flex: 1,
    textAlign: "center",
  },
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
    backgroundColor: Colors.light.inactiveButton,
    borderRadius: 8,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: Colors.light.specialBlue,
  },
});
