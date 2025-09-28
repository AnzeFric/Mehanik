import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { database } from "..";
import RNFS from "react-native-fs";

interface BackupData {
  exportDate: string;
  version: string;
  appVersion: string;
  data: {
    [key: string]: any[];
  };
}

interface ExportRecord {
  id: string;
  [key: string]: any;
}

const defaultOptions = {
  oilChange: false,
  filterChange: false,
  airFilter: false,
  cabinFilter: false,
  frontBrakes: false,
  backBrakes: false,
  batteryCheck: false,
  brakeFluid: false,
  coolant: false,
  sparkPlugs: false,
  outerTiming: false,
  outerTimingComplete: false,
  timingChain: false,
  transmissionFluid: false,
  transmissionFilter: false,
  gearFluid: false,
  waterPump: false,
};

class DatabaseBackupService {
  static COLLECTIONS = ["customers", "vehicles", "repairs"];

  static async exportDatabase(): Promise<
    boolean | { success: boolean; filePath: string; filename: string }
  > {
    try {
      console.log("Starting database export...");

      const allData: { [key: string]: ExportRecord[] } = {};

      // Export each collection
      for (const collectionName of this.COLLECTIONS) {
        try {
          const collection = database.get(collectionName);
          const records = await collection.query().fetch();

          allData[collectionName] = records.map((record) => ({
            ...record._raw,
            id: record.id,
          }));

          console.log(
            `Exported ${records.length} records from ${collectionName}`
          );
        } catch (error) {
          console.warn(`Failed to export collection ${collectionName}:`, error);
          allData[collectionName] = [];
        }
      }

      const exportData: BackupData = {
        exportDate: new Date().toISOString(),
        version: "1.0",
        appVersion: "1.0.0",
        data: allData,
      };

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `database_backup_${timestamp}.json`;

      const documentsDir = FileSystem.documentDirectory;
      const fileUri = documentsDir + filename;

      const jsonString = JSON.stringify(exportData, null, 2);
      await FileSystem.writeAsStringAsync(fileUri, jsonString);

      const publicPath = `${RNFS.DownloadDirectoryPath}/${filename}`;
      await RNFS.copyFile(fileUri, publicPath);

      return true;
    } catch (error) {
      console.error("Database export failed:", error);
      return false;
    }
  }

  static async importDatabase(): Promise<
    boolean | { success: boolean; error: string }
  > {
    try {
      console.log("Starting database import...");

      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return false;
      }

      // Read file content
      const fileContent = await FileSystem.readAsStringAsync(
        result.assets[0].uri
      );
      const importData: BackupData = JSON.parse(fileContent);

      // Validate import data structure
      if (!importData.data || !importData.version) {
        throw new Error("Invalid backup file format");
      }

      console.log("Import data validated, starting import...");

      await database.write(async () => {
        // Clear existing data in reverse order to maintain referential integrity
        const clearOrder = ["repairs", "vehicles", "customers"];

        console.log("Clearing existing database...");
        for (const collectionName of clearOrder) {
          const collection = database.get(collectionName);
          const existingRecords = await collection.query().fetch();

          for (const record of existingRecords) {
            await record.destroyPermanently();
          }
          console.log(
            `Cleared ${existingRecords.length} records from ${collectionName}`
          );
        }

        // Import in order to maintain relationships: customers -> vehicles -> repairs
        const importOrder = ["customers", "vehicles", "repairs"];

        for (const collectionName of importOrder) {
          if (importData.data[collectionName]) {
            const collection = database.get(collectionName);
            const records = importData.data[collectionName];

            console.log(
              `Importing ${records.length} records to ${collectionName}...`
            );

            for (const recordData of records) {
              try {
                // Create new record
                await collection.create((record: any) => {
                  record._raw.id = recordData.id;

                  if (collectionName === "customers") {
                    record.uuid = recordData.uuid;
                    record.firstName = recordData.first_name;
                    record.lastName = recordData.last_name;
                    record.email = recordData.email;
                    record.phone = recordData.phone;
                  } else if (collectionName === "vehicles") {
                    record.brand = recordData.brand;
                    record.model = recordData.model;
                    record.buildYear = recordData.build_year;
                    record.vin = recordData.vin;
                    record.image = recordData.image;
                    record.description = recordData.description;
                    record.customerId = recordData.customer_id;
                  } else if (collectionName === "repairs") {
                    record.uuid = recordData.uuid;
                    record.type = recordData.type;
                    record.kilometers = recordData.kilometers || null;
                    record.price = recordData.price || null;
                    record.repairDate = recordData.repair_date
                      ? new Date(recordData.repair_date)
                      : null;
                    try {
                      let parsedOptions = JSON.parse(recordData.options);
                      if (typeof parsedOptions === "string") {
                        parsedOptions = JSON.parse(parsedOptions);
                      }
                      record.options = {
                        ...defaultOptions,
                        ...parsedOptions,
                      };
                    } catch {
                      record.options = defaultOptions;
                    }
                    record.description = recordData.description || null;
                    try {
                      let parsedImages = JSON.parse(recordData.images);
                      if (typeof parsedImages === "string") {
                        parsedImages = JSON.parse(parsedImages);
                      }
                      record.images = Array.isArray(parsedImages)
                        ? parsedImages
                        : [];
                    } catch {
                      record.images = [];
                    }
                    record.note = recordData.note || null;
                    record.customerId = recordData.customer_id;
                  }
                });
              } catch (error) {
                console.warn(
                  `Failed to import record ${recordData.id}:`,
                  error
                );
              }
            }
          }
        }
      });

      return true;
    } catch (error) {
      console.error("Database import failed:", error);
      return false;
    }
  }
}

export default DatabaseBackupService;
