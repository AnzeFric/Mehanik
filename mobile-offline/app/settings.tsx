import { View, StyleSheet, Alert } from "react-native";
import TitleRow from "@/components/global/TitleRow";
import { useTheme } from "@/context/ThemeContext";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedButton from "@/components/global/themed/ThemedButton";
import ThemedView from "@/components/global/themed/ThemedView";
import DatabaseBackupService from "@/database/services/DatabaseService";
import { router } from "expo-router";
import { useCustomers } from "@/hooks/useCustomers";
import useDataStore from "@/stores/useDataStore";

export default function SettingsScreen() {
  const { selectedTheme, setSelectedTheme } = useTheme();
  const { fetchCustomers } = useCustomers();
  const { setCustomers } = useDataStore();

  const exportDatabase = async () => {
    const result = await DatabaseBackupService.exportDatabase();
    if (result) {
      Alert.alert("Uspeh", "Uspešno izvožena podatkovna baza.");
    } else {
      Alert.alert("Napaka", "Pri izvozu je prišlo do napake. Kliči anžeta.");
    }
    router.back();
  };

  const importDatabase = async () => {
    const result = await DatabaseBackupService.importDatabase();
    if (result) {
      Alert.alert("Uspeh", "Uspešno uvožena podatkovna baza.");
      const customers = await fetchCustomers();
      if (customers) {
        setCustomers(customers);
      }
    } else {
      Alert.alert("Napaka", "Pri uvozu je prišlo do napake. Kliči anžeta.");
    }
    router.back();
  };

  return (
    <ThemedView type={"background"} style={styles.container}>
      <TitleRow title={"Nastavitve"} hasBackButton={true} />
      <View style={styles.itemContainer}>
        <ThemedText type={"normal"}>Tema aplikacije</ThemedText>
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
      <View style={styles.exportImportContainer}>
        <ThemedButton
          buttonType={"small"}
          buttonText={"Izvoz podatkov"}
          onPress={exportDatabase}
        />
        <ThemedButton
          buttonType={"small"}
          buttonText={"Uvoz podatkov"}
          onPress={importDatabase}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    gap: 20,
    flex: 1,
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
  exportImportContainer: {
    flex: 1,
    gap: 20,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
});
