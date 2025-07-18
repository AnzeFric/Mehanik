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
import LoadingScreen from "@/components/global/LoadingScreen";
import TitleRow from "@/components/global/TitleRow";
import ImageView from "react-native-image-viewing";
import ThemedView from "@/components/global/themed/ThemedView";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import ThemedIcon from "@/components/global/themed/ThemedIcon";
import EditMenu from "@/components/mechanic/library/EditMenu";
import ThemedText from "@/components/global/themed/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import useDataStore from "@/stores/useDataStore";
import { usePdf } from "@/hooks/usePdf";

export default function DetailRepairScreen() {
  const { customerUuid, repairUuid } = useLocalSearchParams();
  const { customers } = useDataStore();
  const { staticColors } = useAnimatedTheme();
  const { generateRepairPdf } = usePdf();

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [imageViewVisible, setImageViewVisible] = useState(false);

  const foundCustomer = useMemo(() => {
    return customers.find(
      (customer) => customer.customer.uuid === customerUuid.toString()
    );
  }, [customers, customerUuid]);

  const repairData = useMemo(() => {
    if (foundCustomer) {
      return foundCustomer.repairs?.find(
        (repair) => repair.uuid === repairUuid
      );
    }
    Alert.alert("Napaka", "Servisa ni bilo mogoče najti");
    router.back();
    return;
  }, [foundCustomer]);

  const viewImages = useMemo(() => {
    if (repairData?.images) {
      return repairData.images.map((uri, index) => ({
        uri: uri,
        key: `image-${Date.now()}-${index}-${Math.random()}`,
      }));
    }
    return [];
  }, [repairData]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsMenuVisible(false);
      };
    }, [])
  );

  const exportRepair = () => {
    if (repairData && foundCustomer) {
      generateRepairPdf(
        repairData,
        foundCustomer.customer,
        foundCustomer.vehicle
      );
    }
  };

  return (
    <ThemedView type={"background"} style={styles.container}>
      <TitleRow
        title={formatRepairType(repairData?.type || "")}
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
        {isMenuVisible && repairData && (
          <EditMenu
            onEditPress={() =>
              router.push({
                pathname: "/repair/edit",
                params: {
                  customerUuid: customerUuid,
                  repairUuid: repairData.uuid,
                },
              })
            }
            onExportPress={exportRepair}
          />
        )}
      </View>
      {repairData ? (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView type={"primary"} style={styles.itemContainer}>
            <ThemedText type={"normal"} bold>
              Cena popravila
            </ThemedText>
            <View style={styles.itemContent}>
              <ThemedIcon name={"cash-outline"} size={15} />
              <ThemedText type={"small"}>
                {formatCurrency(repairData.price)}
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
                {formatDate(new Date(repairData.repairDate))}
              </ThemedText>
            </View>
          </ThemedView>

          <ThemedView type={"primary"} style={styles.itemContainer}>
            <ThemedText type={"normal"} bold>
              Izvedena popravila
            </ThemedText>
            <View style={{ gap: 10 }}>
              {repairData.options &&
                Object.entries(repairData.options)
                  .filter(([_, value]) => value)
                  .map(([key], index) => (
                    <View key={key} style={styles.repairItem}>
                      <View
                        style={[
                          styles.checkmarkCircle,
                          { backgroundColor: staticColors.specialBlue },
                        ]}
                      >
                        <Ionicons
                          name="checkmark"
                          size={14}
                          color={staticColors.iconWithDarkBackground}
                        />
                      </View>
                      <ThemedText type={"small"}>
                        {formatRepairItems(key)}
                      </ThemedText>
                    </View>
                  ))}
              {repairData.description && (
                <ThemedText type={"small"}>{repairData.description}</ThemedText>
              )}
            </View>
          </ThemedView>

          {repairData.note && (
            <ThemedView type={"primary"} style={styles.itemContainer}>
              <ThemedText type={"normal"} bold>
                Dodatne opombe
              </ThemedText>
              <ThemedText type={"small"}>{repairData.note}</ThemedText>
            </ThemedView>
          )}

          {repairData.images && repairData.images.length > 0 && (
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
                    {repairData.images.length} slik
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          )}
        </ScrollView>
      ) : (
        <LoadingScreen type={"full"} text={"Nalaganje..."} />
      )}
      <ImageView
        images={viewImages}
        keyExtractor={(uri, index) => `${index}`}
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
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  contentContainer: {
    gap: 15,
    paddingVertical: 20,
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
