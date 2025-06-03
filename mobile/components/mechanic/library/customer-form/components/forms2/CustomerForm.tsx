import { TextInput, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { CustomerData } from "@/interfaces/customer";
import { useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors";

interface Props {
  customerUuid: string | undefined;
  setCustomer: (customer: CustomerData) => void;
}

export default function CustomerForm({ customerUuid, setCustomer }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const updatedCustomer: CustomerData = {
      uuid: customerUuid || "",
      firstName,
      lastName,
      phone: phone || null,
      email,
    };
    setCustomer(updatedCustomer);
  }, [firstName, lastName, phone, email]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
      };
    }, [])
  );

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder={"Ime"}
        value={firstName}
        onChangeText={setFirstName}
        autoCapitalize={"words"}
      />

      <TextInput
        style={styles.input}
        placeholder={"Priimek"}
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize={"words"}
      />

      <TextInput
        style={styles.input}
        placeholder={"Telefonska št. (ni obvezno)"}
        value={phone}
        onChangeText={setPhone}
        autoCapitalize={"none"}
        keyboardType={"phone-pad"}
      />

      <TextInput
        style={styles.input}
        placeholder={"Email (ni obvezno)"}
        value={email}
        onChangeText={setEmail}
        autoCapitalize={"none"}
        keyboardType={"email-address"}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
    marginBottom: 15,
    paddingVertical: 8,
  },
});
