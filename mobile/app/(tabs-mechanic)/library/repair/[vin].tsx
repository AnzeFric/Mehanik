import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useCallback } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import {
  formatDate,
  formatServiceType,
  formatServiceItems,
  formatCurrency,
} from "@/constants/util";
import ModalPrompt from "@/components/mechanic/modals/ModalPrompt";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "@/components/global/LoadingScreen";
import { useRepair } from "@/hooks/useRepair";
import TitleRow from "@/components/shared/TitleRow";

export default function DetailRepairScreen() {
  const { vehicleVin } = useLocalSearchParams();
  const { currentRepairFocus } = useRepair();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsMenuVisible(false);
      };
    }, [])
  );

  const menuIcon: React.ReactNode = (
    <MenuIcon
      height={30}
      width={30}
      style={{ alignSelf: "flex-start" }}
      onPress={() => {
        setIsMenuVisible(!isMenuVisible);
      }}
    />
  );

  return (
    <View style={styles.mainContainer}>
      <View>
        <TitleRow
          title={
            currentRepairFocus
              ? formatServiceType(currentRepairFocus.type)
              : "Servis ne obstaja"
          }
          hasBackButton={true}
          menuButton={menuIcon}
        />

        {isMenuVisible && currentRepairFocus && (
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItemContainer}
              onPress={() => router.push(`/library/repair/edit/${vehicleVin}`)}
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
      {currentRepairFocus ? (
        <>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
          >
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
                        {formatCurrency(currentRepairFocus.price)}
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
                        {formatDate(new Date(currentRepairFocus.date))}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.sectionTitle}>Izvedena popravila</Text>
                <View style={styles.repairsList}>
                  {currentRepairFocus.options &&
                    Object.entries(currentRepairFocus.options)
                      .filter(([_, value]) => value)
                      .map(([key], index) => (
                        <View key={key} style={styles.repairItem}>
                          <View style={styles.checkmarkCircle}>
                            <Ionicons
                              name="checkmark"
                              size={14}
                              color="#FFFFFF"
                            />
                          </View>
                          <Text style={styles.repairText}>
                            {formatServiceItems(key)}
                          </Text>
                        </View>
                      ))}
                  {currentRepairFocus.description && (
                    <Text style={styles.customServiceText}>
                      {currentRepairFocus.description}
                    </Text>
                  )}
                </View>
              </View>

              {currentRepairFocus.note && (
                <View style={styles.infoCard}>
                  <Text style={styles.sectionTitle}>Dodatne opombe</Text>
                  <Text style={styles.notesText}>
                    {currentRepairFocus.note}
                  </Text>
                </View>
              )}

              {currentRepairFocus.images &&
                currentRepairFocus.images.length > 0 && (
                  <View style={styles.infoCard}>
                    <Text style={styles.sectionTitle}>Slike servisa</Text>
                    <View style={styles.imagesPlaceholder}>
                      <Ionicons
                        name="images-outline"
                        size={24}
                        color={Colors.light.secondaryText}
                      />
                      <Text style={styles.imagesText}>
                        {currentRepairFocus.images.length} slik
                      </Text>
                    </View>
                  </View>
                )}
            </View>
          </ScrollView>
        </>
      ) : (
        <LoadingScreen />
      )}

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
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    color: Colors.light.text,
  },
  customServiceText: {
    fontSize: 16,
    color: Colors.light.text,
    marginTop: 8,
  },
  notesText: {
    fontSize: 16,
    color: Colors.light.text,
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
    color: Colors.light.secondaryText,
  },
  menuContainer: {
    position: "absolute",
    right: 16,
    top: 70,
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
    fontWeight: "bold",
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
