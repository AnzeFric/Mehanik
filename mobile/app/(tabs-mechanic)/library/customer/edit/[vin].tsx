import { View, StyleSheet } from "react-native";
import { useState } from "react";
import CustomerForm from "@/components/mechanic/library/customer-form/components/forms2/CustomerForm";
import TemplateView from "@/components/mechanic/library/TemplateView";
import { CustomerData } from "@/interfaces/customer";

export default function EditCustomerScreen() {
  const [customerData, setCustomerData] = useState<CustomerData>();

  const handleSaveEdit = () => {};

  return (
    <TemplateView
      title={"Uredi stranko"}
      buttonText={"Uredi"}
      onButtonPress={handleSaveEdit}
    >
      <View style={styles.container}>
        <CustomerForm setCustomer={setCustomerData} />
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
});
