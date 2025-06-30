import * as RNHTMLtoPDF from "react-native-html-to-pdf";
import { Platform } from "react-native";

export const usePdf = () => {
  const generatePdf = async () => {
    try {
      let PDFOptions = {
        html: "<h1>Generate PDF!</h1>",
        fileName: "file",
        directory: Platform.OS === "android" ? "Downloads" : "Documents",
      };
      let file = await RNHTMLtoPDF.convert(PDFOptions);
      if (!file.filePath) return;
      alert(file.filePath);
    } catch (error) {
      console.log("Failed to generate pdf", error);
    }
  };

  return { generatePdf };
};
