import { View, StyleSheet } from "react-native";
import { useState, useCallback, useMemo, useEffect } from "react";
import DisplayItems from "@/components/global/DisplayItems";
import CustomerItem from "@/components/mechanic/items/Customer";
import { router, useFocusEffect } from "expo-router";
import PlusButton from "@/components/global/PlusButton";
import TitleRow from "@/components/global/TitleRow";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedSearchInput from "@/components/global/themed/ThemedSearchInput";
import { CustomerFormData } from "@/interfaces/customer";
import { database } from "@/database/index";
import Customer from "@/database/models/Customer";
import { RepairData } from "@/interfaces/repair";

export default function HomeScreen() {
  const [customers, setCustomers] = useState<Array<CustomerFormData>>([]);
  const [search, setSearch] = useState<string>("");

  const transformCustomerData = async (
    customer: Customer
  ): Promise<CustomerFormData> => {
    const vehicle = customer.vehicle;
    const repairs = await customer.repairs.fetch();

    return {
      uuid: customer.uuid,
      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
      },
      vehicle: vehicle
        ? {
            brand: vehicle.brand,
            model: vehicle.model,
            buildYear: vehicle.buildYear,
            vin: vehicle.vin,
            image: vehicle.image,
            description: vehicle.description,
          }
        : {
            brand: "",
            model: "",
            buildYear: null,
            vin: null,
            image: null,
            description: null,
          },
      repair: repairs.map(
        (repair): RepairData => ({
          uuid: repair.uuid,
          type: repair.type,
          price: repair.price,
          date: repair.repairDate,
          options: repair.options,
          description: repair.description,
          images: repair.images,
          note: repair.note,
        })
      ),
    };
  };

  useEffect(() => {
    const subscription = database
      .get<Customer>("customers")
      .query()
      .observe()
      .subscribe(async (customerModels) => {
        try {
          const transformedCustomers = await Promise.all(
            customerModels.map(transformCustomerData)
          );
          setCustomers(transformedCustomers);
        } catch (error) {
          console.error("Error transforming customer data:", error);
          setCustomers([]);
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  const filteredData: Array<CustomerFormData> = useMemo(() => {
    if (search.trim() === "") return customers;

    return customers.filter((customer) => {
      const searchLower = search.toLowerCase();

      // Customer name search
      const customerMatch =
        customer.customer.firstName?.toLowerCase().includes(searchLower) ||
        customer.customer.lastName?.toLowerCase().includes(searchLower) ||
        customer.customer.email?.toLowerCase().includes(searchLower) ||
        customer.customer.phone?.toLowerCase().includes(searchLower);

      // Vehicle search
      const vehicleMatch =
        customer.vehicle.brand?.toLowerCase().includes(searchLower) ||
        customer.vehicle.model?.toLowerCase().includes(searchLower) ||
        customer.vehicle.vin?.toLowerCase().includes(searchLower) ||
        customer.vehicle.buildYear?.toString().includes(searchLower);

      return customerMatch || vehicleMatch;
    });
  }, [search, customers]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearch("");
      };
    }, [])
  );

  return (
    <ThemedView type={"background"} style={{ flex: 1 }}>
      <View style={styles.header}>
        <TitleRow title={"Knjižnica servisov"} hasBackButton={false} />
        <ThemedSearchInput value={search} onChangeText={setSearch} />
      </View>
      <DisplayItems
        list={filteredData}
        renderItem={(customer, index) => (
          <CustomerItem customer={customer} key={index} />
        )}
        emptyMessage="Stranke ne obstajajo."
      />
      <PlusButton
        onPress={() => {
          router.push("/customer/add");
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    gap: 20,
  },
});
