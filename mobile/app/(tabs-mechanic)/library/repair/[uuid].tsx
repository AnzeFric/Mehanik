import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useState, useCallback, useMemo } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import {
  formatDate,
  formatRepairType,
  formatRepairItems,
  formatCurrency,
} from "@/constants/util";
import ModalPrompt from "@/components/mechanic/modals/ModalPrompt";
import LoadingScreen from "@/components/global/LoadingScreen";
import { useRepair } from "@/hooks/useRepair";
import TitleRow from "@/components/shared/TitleRow";
import useCustomerStore from "@/stores/useCustomerStore";
import ImageView from "react-native-image-viewing";
import ThemedView from "@/components/global/themed/ThemedView";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import ThemedIcon from "@/components/global/themed/ThemedIcon";
import EditMenu from "@/components/mechanic/library/EditMenu";
import ThemedText from "@/components/global/themed/ThemedText";

export default function DetailRepairScreen() {
  const { uuid } = useLocalSearchParams(); // Vehicle uuid

  const { staticColors } = useAnimatedTheme();
  const { setShouldRefetch } = useCustomerStore();
  const { currentRepairFocus, deleteVehicleRepair } = useRepair();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [imageViewVisible, setImageViewVisible] = useState(false);

  const viewImages = useMemo(() => {
    if (currentRepairFocus?.images) {
      return currentRepairFocus.images.map((uri) => ({ uri }));
    }
    return [];
  }, [currentRepairFocus]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsMenuVisible(false);
      };
    }, [])
  );

  const handleDeleteRepairPress = async () => {
    if (currentRepairFocus) {
      const success = await deleteVehicleRepair(currentRepairFocus?.uuid);
      setIsMenuVisible(false);
      setIsModalOpen(false);

      if (success) {
        setShouldRefetch(true);
        router.back();
      }
    } else {
      Alert.alert(
        "Napaka",
        "Trenutno ni možno izbrisati servisa. Poskusite ponovno kasneje."
      );
    }
  };

  return (
    <ThemedView type={"background"} style={styles.container}>
      <TitleRow
        title={
          currentRepairFocus
            ? formatRepairType(currentRepairFocus.type)
            : "Servis ne obstaja"
        }
        hasBackButton={true}
        menuButton={
          <ThemedIcon
            name={"menu"}
            size={30}
            onPress={() => {
              setIsMenuVisible(!isMenuVisible);
            }}
          />
        }
      />
      <View>
        {isMenuVisible && currentRepairFocus && (
          <EditMenu
            onEditPress={() => router.push(`/library/repair/edit/${uuid}`)}
            onDeleteClose={() => setIsModalOpen(true)}
          />
        )}
      </View>
      {currentRepairFocus ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <ThemedView type={"primary"} style={styles.itemContainer}>
            <ThemedText type={"normal"} bold>
              Cena popravila
            </ThemedText>
            <View style={styles.itemContent}>
              <ThemedIcon name={"cash-outline"} size={15} />
              <ThemedText type={"small"}>
                {formatCurrency(currentRepairFocus.price)}
              </ThemedText>
            </View>
          </ThemedView>

          <ThemedView type={"primary"} style={styles.itemContainer}>
            <ThemedText type={"normal"} bold>
              Datum izvedbe
            </ThemedText>
            <View style={styles.itemContent}>
              <ThemedIcon name="calendar" size={16} />
              <ThemedText type={"small"}>
                {formatDate(new Date(currentRepairFocus.date))}
              </ThemedText>
            </View>
          </ThemedView>

          <ThemedView type={"primary"} style={styles.itemContainer}>
            <ThemedText type={"normal"} bold>
              Izvedena popravila
            </ThemedText>
            <View style={{ gap: 10 }}>
              {currentRepairFocus.options &&
                Object.entries(currentRepairFocus.options)
                  .filter(([_, value]) => value)
                  .map(([key], index) => (
                    <View key={key} style={styles.repairItem}>
                      <View
                        style={[
                          styles.checkmarkCircle,
                          { backgroundColor: staticColors.specialBlue },
                        ]}
                      >
                        <ThemedIcon name="checkmark" size={14} />
                      </View>
                      <ThemedText type={"small"}>
                        {formatRepairItems(key)}
                      </ThemedText>
                    </View>
                  ))}
              {currentRepairFocus.description && (
                <ThemedText type={"small"}>
                  {currentRepairFocus.description}
                </ThemedText>
              )}
            </View>
          </ThemedView>

          {currentRepairFocus.note && (
            <ThemedView type={"primary"} style={styles.itemContainer}>
              <ThemedText type={"normal"} bold>
                Dodatne opombe
              </ThemedText>
              <ThemedText type={"small"}>{currentRepairFocus.note}</ThemedText>
            </ThemedView>
          )}

          {currentRepairFocus.images &&
            currentRepairFocus.images.length > 0 && (
              <ThemedView type={"primary"} style={styles.itemContainer}>
                <ThemedText type={"normal"} bold>
                  Slike servisa
                </ThemedText>
                <ThemedView type={"secondary"} style={{ borderRadius: 12 }}>
                  <TouchableOpacity
                    style={styles.imageButton}
                    onPress={() => setImageViewVisible(true)}
                  >
                    <ThemedIcon name="images-outline" size={24} />
                    <ThemedText type={"small"}>
                      {currentRepairFocus.images.length} slik
                    </ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>
            )}
        </ScrollView>
      ) : (
        <LoadingScreen type={"full"} text={"Nalaganje..."} />
      )}
      <ModalPrompt
        isVisible={isModalOpen}
        message={"Trajno boste izbrisali servis. Ste prepričani?"}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleDeleteRepairPress}
      />
      <ImageView
        images={viewImages}
        imageIndex={0}
        visible={imageViewVisible}
        onRequestClose={() => setImageViewVisible(false)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  contentContainer: {
    gap: 15,
    paddingHorizontal: 25,
  },
  itemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
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
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  repairItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkmarkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 16,
    justifyContent: "center",
    flex: 1,
  },
});
