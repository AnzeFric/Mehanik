import { View, StyleSheet } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import Mechanic from "@/components/user/items/Mechanic";
import DisplayItems from "@/components/global/DisplayItems";
import TitleRow from "@/components/shared/TitleRow";
import useMechanicStore from "@/stores/useMechanicStore";
import { useUser } from "@/hooks/useUser";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedSearchInput from "@/components/global/themed/ThemedSearchInput";

export default function MechanicsScreen() {
  const { mechanics } = useMechanicStore();
  const { getMechanics } = useUser();
  const [search, setSearch] = useState<string>("");

  const filteredMechanics =
    search.trim() === ""
      ? mechanics
      : mechanics.filter(
          (mechanic) =>
            mechanic.firstName.toLowerCase().includes(search.toLowerCase()) ||
            mechanic.lastName.toLowerCase().includes(search.toLowerCase()) ||
            mechanic.info.address
              ?.toLowerCase()
              .includes(search.toLowerCase()) ||
            mechanic.info.city?.toLowerCase().includes(search.toLowerCase()) ||
            mechanic.info.phone?.includes(search.toLowerCase()) ||
            mechanic.email?.toLowerCase().includes(search.toLowerCase())
        );

  useEffect(() => {
    const populateMechanicList = async () => {
      await getMechanics();
    };
    populateMechanicList();
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearch("");
      };
    }, [])
  );

  return (
    <ThemedView type={"background"} style={{ flex: 1 }}>
      <TitleRow title={"Mehaniki"} hasBackButton={false} />
      <View style={styles.header}>
        <ThemedSearchInput
          placeholder={"Iskanje"}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <DisplayItems
        list={filteredMechanics}
        renderItem={(mechanic, index) => (
          <Mechanic mechanicData={mechanic} key={index} />
        )}
        emptyMessage="Mehaniki ne obstajajo."
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
});
