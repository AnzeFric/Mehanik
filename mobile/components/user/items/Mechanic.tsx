import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { MechanicData2 } from "@/interfaces/user";

interface Props {
  mechanicData: MechanicData2;
}

export default function Mechanic({ mechanicData }: Props) {
  const handlePress = () => {
    router.push(`/(tabs-user)/mechanics/mechanic/${mechanicData.email}`);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      {mechanicData.info.image ? (
        <Image source={{ uri: mechanicData.info.image }} style={styles.image} />
      ) : (
        <Image
          source={require("@/assets/images/logo-main.png")}
          style={styles.image}
        />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {mechanicData.firstName} {mechanicData.lastName}
        </Text>
        {mechanicData.info.address && (
          <Text style={styles.address}>
            {mechanicData.info.address}, {mechanicData.info.city}
          </Text>
        )}
        {mechanicData.info.phone && (
          <Text style={styles.contact}>{mechanicData.info.phone}</Text>
        )}
        {mechanicData.email && (
          <Text style={styles.contact}>{mechanicData.email}</Text>
        )}
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
