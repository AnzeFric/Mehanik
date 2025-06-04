import { TextInput, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { CustomerData } from "@/interfaces/customer";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "expo-router";

interface Props {
  customer?: CustomerData;
  setCustomer: (customer: CustomerData) => void;
}

export default function CustomerForm({ customer, setCustomer }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");

  useEffect(() => {
    if (customer) {
      setFirstName(customer.firstName || "");
      setLastName(customer.lastName || "");
      setPhone(customer.phone || "");
      setEmail(customer.email || "");
    }
  }, [customer]);

  // Update parent whenever form data changes
  useEffect(() => {
    if (firstName || lastName) {
      const customerData: CustomerData = {
        uuid: customer?.uuid || "",
        firstName,
        lastName,
        phone: phone || null,
        email: email || null,
      };
      setCustomer(customerData);
    }
  }, [firstName, lastName, phone, email]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setFirstName(customer?.firstName || "");
        setLastName(customer?.lastName || "");
        setPhone(customer?.phone || "");
        setEmail(customer?.email || "");
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
        value={phone || ""}
        onChangeText={setPhone}
        autoCapitalize={"none"}
        keyboardType={"phone-pad"}
      />

      <TextInput
        style={styles.input}
        placeholder={"Email (ni obvezno)"}
        value={email || ""}
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
