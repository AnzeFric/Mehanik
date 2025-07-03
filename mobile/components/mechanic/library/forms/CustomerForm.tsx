import { StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { CustomerData } from "@/interfaces/customer";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "expo-router";
import ThemedTextInput from "@/components/global/themed/ThemedTextInput";

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

  const updateParent = useCallback(
    (updates: Partial<CustomerData>) => {
      const customerData: CustomerData = {
        uuid: customer?.uuid || "",
        firstName: firstName,
        lastName: lastName,
        phone: phone || null,
        email: email || null,
        ...updates,
      };
      setCustomer(customerData);
    },
    [firstName, lastName, phone, email]
  );

  const handleFirstNameChange = useCallback(
    (value: string) => {
      setFirstName(value);
      updateParent({ firstName: value });
    },
    [updateParent]
  );

  const handleLastNameChange = useCallback(
    (value: string) => {
      setLastName(value);
      updateParent({ lastName: value });
    },
    [updateParent]
  );

  const handlePhoneChange = useCallback(
    (value: string) => {
      setPhone(value);
      updateParent({ phone: value || null });
    },
    [updateParent]
  );

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmail(value);
      updateParent({ email: value || null });
    },
    [updateParent]
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!customer) {
          setFirstName("");
          setLastName("");
          setPhone("");
          setEmail("");
        }
      };
    }, [customer])
  );

  return (
    <>
      <ThemedTextInput
        style={styles.input}
        placeholder={"Ime"}
        value={firstName}
        onChangeText={handleFirstNameChange}
        autoCapitalize={"words"}
      />
      <ThemedTextInput
        style={styles.input}
        placeholder={"Priimek"}
        value={lastName}
        onChangeText={handleLastNameChange}
        autoCapitalize={"words"}
      />
      <ThemedTextInput
        style={styles.input}
        placeholder={"Telefonska št. (ni obvezno)"}
        value={phone || ""}
        onChangeText={handlePhoneChange}
        autoCapitalize={"none"}
        keyboardType={"phone-pad"}
      />
      <ThemedTextInput
        style={styles.input}
        placeholder={"Email (ni obvezno)"}
        value={email || ""}
        onChangeText={handleEmailChange}
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
