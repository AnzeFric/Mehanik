import { View, TextInput, StyleSheet } from "react-native";
import { useState, useEffect, useCallback, useRef } from "react";
import { AppStyles } from "@/constants/Styles";
import { useFocusEffect } from "expo-router";
import Mechanic from "@/components/user/items/Mechanic";
import DisplayItems from "@/components/global/DisplayItems";
import TitleRow from "@/components/shared/TitleRow";
import useMechanicStore from "@/stores/useMechanicStore";
import { useUser } from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";

export default function MechanicsScreen() {
  const { mechanics, setMechanics } = useMechanicStore();
  const { getMechanics } = useUser();
  const [search, setSearch] = useState<string>("");

  const inputRef = useRef<TextInput>(null);

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
      const mechanics = await getMechanics();
      setMechanics(mechanics);
    };
    populateMechanicList();
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setTimeout(() => {
          setSearch("");
        }, 100); // For smooth transition between screens
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <TitleRow title={"Mehaniki"} hasBackButton={false} />

      <View style={styles.header}>
        <View style={AppStyles.inputContainer}>
          <TextInput
            style={AppStyles.input}
            placeholder={"Iskanje"}
            value={search}
            onChangeText={setSearch}
            ref={inputRef}
          />
          <Ionicons
            name={"search-outline"}
            size={20}
            color={"#888"}
            onPress={() => inputRef.current?.focus()}
          />
        </View>
      </View>
      <DisplayItems
        list={filteredMechanics}
        renderItem={(mechanic, index) => (
          <Mechanic mechanicData={mechanic} key={index} />
        )}
        emptyMessage="Mehaniki ne obstajajo."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
});
