import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useState, useCallback } from "react";
import { AppStyles } from "@/constants/Styles";
import BackIcon from "@/assets/icons/BackIcon.svg";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors";
import {
  formatDate,
  formatServiceType,
  formatServiceItems,
  formatCurrency,
} from "@/constants/util";
import { ServiceData } from "@/interfaces/mechanic";
import ModalPrompt from "@/components/mechanic/modals/ModalPrompt";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import { Ionicons } from "@expo/vector-icons";

const fakeData: ServiceData = {
  id: 4,
  date: new Date(2024, 7, 30),
  serviceType: "large",
  serviceItems: {
    oilChange: true,
    filterChange: true,
    brakeCheck: true,
    tireRotation: true,
    fluidCheck: true,
    batteryCheck: true,
    sparkPlugs: false,
    airFilter: true,
    cabinFilter: true,
    suspension: true,
    timing: true,
    coolant: true,
  },
  serviceNotes:
    "Annual comprehensive service completed. Timing belt replaced as scheduled maintenance. All systems functioning properly.",
  serviceImages: ["timing_belt_30072024.jpg", "coolant_flush_30072024.jpg"],
  servicePrice: 495.25,
};

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsMenuVisible(false);
      };
    }, [])
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <BackIcon height={26} width={26} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {formatServiceType(fakeData.serviceType)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsMenuVisible(!isMenuVisible)}
        >
          <MenuIcon height={26} width={26} />
        </TouchableOpacity>

        {isMenuVisible && (
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItemContainer}
              onPress={() => router.push(`/library/service-edit/${id}`)}
            >
              <Ionicons
                name="create-outline"
                size={18}
                color={Colors.light.text}
              />
              <Text style={styles.menuItem}>UREDI</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItemContainer, styles.menuItemDelete]}
              onPress={() => setIsModalOpen(true)}
            >
              <Ionicons name="trash-outline" size={18} color="#E53935" />
              <Text style={[styles.menuItem, styles.menuItemTextDelete]}>
                IZBRIŠI
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.scrollViewContent}>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Cena popravila</Text>
                <View style={styles.dateContainer}>
                  <Ionicons
                    name={"cash-outline"}
                    size={16}
                    color={Colors.light.secondaryText}
                  />
                  <Text style={styles.dateText}>
                    {formatCurrency(fakeData.servicePrice)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Datum izvedbe</Text>
                <View style={styles.dateContainer}>
                  <Ionicons
                    name="calendar-outline"
                    size={16}
                    color={Colors.light.secondaryText}
                  />
                  <Text style={styles.dateText}>
                    {formatDate(fakeData.date)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Izvedena popravila</Text>
            <View style={styles.repairsList}>
              {fakeData.serviceItems &&
                Object.entries(fakeData.serviceItems)
                  .filter(([_, value]) => value)
                  .map(([key], index) => (
                    <View key={key} style={styles.repairItem}>
                      <View style={styles.checkmarkCircle}>
                        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                      </View>
                      <Text style={styles.repairText}>
                        {formatServiceItems(key)}
                      </Text>
                    </View>
                  ))}
              {fakeData.customServiceDescription && (
                <Text style={styles.customServiceText}>
                  {fakeData.customServiceDescription}
                </Text>
              )}
            </View>
          </View>

          {fakeData.serviceNotes && (
            <View style={styles.infoCard}>
              <Text style={styles.sectionTitle}>Dodatne opombe</Text>
              <Text style={styles.notesText}>{fakeData.serviceNotes}</Text>
            </View>
          )}

          {fakeData.serviceImages && fakeData.serviceImages.length > 0 && (
            <View style={styles.infoCard}>
              <Text style={styles.sectionTitle}>Slike servisa</Text>
              <View style={styles.imagesPlaceholder}>
                <Ionicons
                  name="images-outline"
                  size={24}
                  color={Colors.light.secondaryText}
                />
                <Text style={styles.imagesText}>
                  {fakeData.serviceImages.length} slik
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <ModalPrompt
        isVisible={isModalOpen}
        message={"Trajno boste izbrisali servis. Ste prepričani?"}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "Jaldi-Bold",
    color: Colors.light.text,
  },
  scrollViewContent: {
    padding: 16,
    gap: 16,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Jaldi-Bold",
    color: Colors.light.text,
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateText: {
    fontSize: 16,
    fontFamily: "Jaldi-Regular",
    color: Colors.light.text,
  },
  repairsList: {
    gap: 10,
  },
  repairItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkmarkCircle: {
    backgroundColor: Colors.light.specialBlue,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  repairText: {
    fontSize: 16,
    fontFamily: "Jaldi-Regular",
    color: Colors.light.text,
  },
  customServiceText: {
    fontSize: 16,
    fontFamily: "Jaldi-Regular",
    color: Colors.light.text,
    marginTop: 8,
  },
  notesText: {
    fontSize: 16,
    fontFamily: "Jaldi-Regular",
    color: Colors.light.text,
    lineHeight: 22,
  },
  imagesPlaceholder: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    padding: 16,
    justifyContent: "center",
  },
  imagesText: {
    fontSize: 16,
    fontFamily: "Jaldi-Regular",
    color: Colors.light.secondaryText,
  },
  menuContainer: {
    position: "absolute",
    right: 16,
    top: 80,
    backgroundColor: "#FFFFFF",
    width: 180,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 5,
    padding: 6,
    overflow: "hidden",
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 2,
    borderRadius: 8,
  },
  menuItem: {
    fontSize: 16,
    fontFamily: "Jaldi-Bold",
    marginLeft: 12,
    color: Colors.light.text,
  },
  menuItemDelete: {
    backgroundColor: "rgba(229, 57, 53, 0.08)",
  },
  menuItemTextDelete: {
    color: "#E53935",
  },
});
