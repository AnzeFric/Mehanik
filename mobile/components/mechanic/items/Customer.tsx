import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { CustomerData } from "@/interfaces/mechanic";

interface Props {
  customerData: CustomerData;
  setSearch: (text: string) => void;
}

export default function Customer({ customerData, setSearch }: Props) {
  const handlePress = () => {
    setSearch("");
    // TODO: Change to email
    router.push(`/library/${customerData}`);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      {customerData.image ? (
        <Image source={{ uri: customerData.image }} style={styles.image} />
      ) : (
        <Image
          source={require("@/assets/images/logo-main.png")}
          style={styles.image}
        />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {customerData.firstName} {customerData.lastName}
        </Text>
        <Text style={styles.address}>
          {customerData.brand} {customerData.model}
          {", "}
          {customerData.buildYear}
        </Text>
        <Text style={styles.contact}>{customerData.vin}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderLeftWidth: 6,
    borderLeftColor: Colors.light.specialBlue,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 6,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
    color: "#666",
  },
  contact: {
    fontSize: 14,
    color: "#888",
  },
});
