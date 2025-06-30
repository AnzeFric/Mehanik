import RNHTMLtoPDF from "react-native-html-to-pdf";
import { Alert, PermissionsAndroid } from "react-native";
import RNFS from "react-native-fs";
import Share, { ShareOptions } from "react-native-share";

export const usePdf = () => {
  const requestStoragePermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Storage Permission Required",
        message: "This app needs access to storage to save PDF files",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const generatePdf = async () => {
    try {
      if (!(await requestStoragePermission())) {
        return;
      }

      let PDFOptions = {
        html: "<h1>Generate PDF!</h1>",
        fileName: "document",
        directory: "Documents",
      };

      let file = await RNHTMLtoPDF.convert(PDFOptions);

      if (!file.filePath) {
        Alert.alert("Napaka", "PDF datoteka ni bila zgenerirana");
        console.error("Failed to generate: ", file);
        return;
      }

      await copyToPublicAndShare(file.filePath);
    } catch (error) {
      console.log("PDF failed to generate: ", error);
    }
  };

  const copyToPublicAndShare = async (originalPath: string) => {
    try {
      const fileName = `document_${Date.now()}.pdf`;
      const publicPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

      await RNFS.copyFile(originalPath, publicPath);

      await sharePdf(publicPath);
    } catch (error) {
      console.log("PDF failed to copy: ", error);
    }
  };

  const sharePdf = async (filePath: string) => {
    try {
      const fileExists = await RNFS.exists(filePath);
      if (!fileExists) {
        Alert.alert("Napaka", "PDF datoteka ni bila najdena");
        return;
      }
      const shareOptions: ShareOptions = {
        title: "Izvoz servisov",
        subject: "Servisi za vozilo",
        message: "V prilogi so izvoženi servisi za vaše vozilo\n\nLp,\nSimon",
        url: `file://${filePath}`,
        type: "application/pdf",
        filename: "document.pdf",
        showAppsToView: true,
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.error("PDF failed to share: ", error);
    }
  };

  return {
    generatePdf,
  };
};
