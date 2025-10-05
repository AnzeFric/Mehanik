import RNHTMLtoPDF from "react-native-html-to-pdf";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import RNFS from "react-native-fs";
import Share, { ShareOptions } from "react-native-share";
import { RepairData } from "@/interfaces/repair";
import {
  formatDate,
  formatRepairType,
  formatCurrency,
  getServiceTranslation,
} from "@/constants/util";
import { CustomerData, CustomerFormData } from "@/interfaces/customer";
import { VehicleData } from "@/interfaces/vehicle";
import useUserStore from "@/stores/useUserStore";
import { useTranslation } from "react-i18next";

export const usePdf = () => {
  const { t } = useTranslation();

  const requestStoragePermission = async () => {
    // Only request permission on Android 9 and below
    if (Platform.OS === "android" && Platform.Version <= 28) {
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
    }

    // On Android 10+, permission is automatically granted
    return true;
  };

  const generateCustomerPdf = async (customer: CustomerFormData) => {
    try {
      if (!(await requestStoragePermission())) {
        return;
      }

      const repairs = customer.repairs || [];

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }

              body {
                font-family: 'Courier New', monospace;
                font-size: 14px;
                line-height: 1.4;
                background: #fff;
                margin: 0 auto;
                padding: 20px;
              }

              .document {
                border: 1px solid #ddd;
                padding: 20px;
                background: #fff;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }

              .header {
                text-align: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 2px solid;
              }

              .document-title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 1px;
              }

              .section {
                margin-bottom: 20px;
              }

              .section-title {
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 8px;
                text-transform: uppercase;
                border-bottom: 1px solid #ccc;
                padding-bottom: 2px;
                color: #333;
              }

              .info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
              }

              .info-item {
                display: flex;
                margin-bottom: 8px;
              }

              .info-label {
                font-weight: bold;
                min-width: 120px;
                margin-right: 10px;
              }

              .info-value {
                flex: 1;
              }

              .repair-item {
                border: 1px solid #ddd;
                margin-bottom: 15px;
                padding: 15px;
                background: #f9f9f9;
              }

              .repair-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                padding-bottom: 8px;
                border-bottom: 1px solid #ccc;
              }

              .repair-type {
                font-weight: bold;
                text-transform: uppercase;
              }

              .repair-date {
                font-size: 12px;
                font-weight: bold;
              }

              .repair-price {
                font-weight: bold;
                font-size: 16px;
              }

              .services-list {
                margin: 10px 0;
              }

              .service-item {
                display: flex;
                align-items: center;
                margin-bottom: 4px;
                font-size: 12px;
              }

              .service-check {
                margin-right: 8px;
                font-weight: bold;
              }

              .repair-description, .repair-note {
                background: #e8e8e8;
                padding: 8px;
                margin: 8px 0;
                border-left: 3px solid #ccc;
                font-size: 12px;
              }

              .image-container {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                  gap: 20px;
              }

              .service-image {
                height: 200px;
                width: 200px;
                border-width: 1px;
              }

              .vehicle-image {
                max-width: 200px;
                max-height: 150px;
                border: 1px solid #ddd;
                margin-top: 10px;
              }

              .no-repairs {
                text-align: center;
                font-style: italic;
                color: #666;
                padding: 20px;
              }

              .thank-you {
                text-align: center;
                margin-top: 15px;
                font-size: 14px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
              }

              .footer {
                margin-top: 20px;
                padding-top: 15px;
                border-top: 1px dashed;
                text-align: center;
                font-size: 11px;
              }

              .footer p {
                margin: 2px 0;
                font-weight: bold
              }

              @media print {
                body {
                  padding: 10px;
                }

                .document {
                  box-shadow: none;
                  border: none;
                }
              }
            </style>
          </head>
          <body>
            <div class="document">
              <div class="header">
                <div class="document-title">${t("hooks.pdf.generate.customerDocumentTitle")}</div>
              </div>

              <div class="info-grid">
                <div class="section">
                  <div class="section-title">${t("hooks.pdf.generate.customerSectionTitle")}</div>
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.name")}</div>
                    <div class="info-value">${customer.customer.firstName}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.surname")}</div>
                    <div class="info-value">${customer.customer.lastName}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.email")}</div>
                    <div class="info-value">${customer.customer.email || t("hooks.pdf.generate.noData")}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.phone")}</div>
                    <div class="info-value">${customer.customer.phone || t("hooks.pdf.generate.noData")}</div>
                  </div>
                </div>

                <div class="section"> 
                  <div class="section-title">${t("hooks.pdf.generate.vehicleSectionTitle")}</div>
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.brand")}</div>
                    <div class="info-value">${customer.vehicle.brand}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.model")}</div>
                    <div class="info-value">${customer.vehicle.model}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.buildYear")}</div>
                    <div class="info-value">${customer.vehicle.buildYear || t("hooks.pdf.generate.noData")}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.vin")}</div>
                    <div class="info-value">${customer.vehicle.vin || t("hooks.pdf.generate.noData")}</div>
                  </div>
                  ${
                    customer.vehicle.description
                      ? `
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.description")}</div>
                    <div class="info-value">${customer.vehicle.description}</div>
                  </div>
                  `
                      : ""
                  }
                </div>
              </div>

              <div class="section">
                <div class="section-title">${t("hooks.pdf.generate.repairSectionTitle")}</div>
                ${
                  repairs.length > 0
                    ? repairs
                        .map((repair) => {
                          const completedServices = getServiceTranslation(
                            repair.options,
                            t
                          );
                          return `
                    <div class="repair-item">
                      <div class="repair-header">
                        <div>
                          <div class="repair-type">${formatRepairType(repair.type, t)}</div>
                          <div class="repair-date">${formatDate(repair.repairDate)}</div>
                        </div>
                        <div>
                          <div class="repair-price">${formatCurrency(repair.price)}</div>
                          <div class="repair-price">${repair.kilometers ?? 0} km</div>
                        </div>
                      </div>
                        
                      ${
                        completedServices.length > 0
                          ? `
                      <div class="services-list">
                        ${completedServices
                          .map(
                            (service) => `
                          <div class="service-item">
                            <span class="service-check">✓</span>
                            <span>${service}</span>
                          </div>
                        `
                          )
                          .join("")}
                      </div>
                      `
                          : ""
                      }

                      ${
                        repair.description
                          ? `
                      <div class="repair-description">
                        <strong>${t("hooks.pdf.generate.repairDescription")}</strong><br>
                        ${repair.description}
                      </div>
                      `
                          : ""
                      }

                      ${
                        repair.note
                          ? `
                      <div class="repair-note">
                        <strong>${t("hooks.pdf.generate.repairNote")}</strong><br>
                        ${repair.note}
                      </div>
                      `
                          : ""
                      }

                      ${
                        repair.images && repair.images.length > 0
                          ? `
                        <div class="section">
                          <div class="section-title">${t("hooks.pdf.generate.repairImages")}</div>
                            <div class="image-container">
                              ${repair.images
                                .map(
                                  (img) => `
                                  <img src="${img}" alt=${t("hooks.pdf.generate.repairImageAlt")} class="service-image">
                              `
                                )
                                .join("")}
                            </div>
                        </div>
                      `
                          : ""
                      }

                      <div class="info-item">
                        <div class="info-label">${t("hooks.pdf.generate.repairId")}</div>
                        <div class="info-value">${repair.uuid}</div>
                      </div>
                    </div>
                  `;
                        })
                        .join("")
                    : `
                  <div class="no-repairs">
                    ${t("hooks.pdf.generate.noRepairs")}
                  </div>
                `
                }
              </div>
              
              <div class="thank-you">${t("hooks.pdf.generate.thankYouNote")}</div>

              <div class="footer">
                <p>${t("hooks.pdf.generate.customerId")} ${customer.customer.uuid}</p>
                <p>${t("hooks.pdf.generate.documentGenerated")} ${new Date().toLocaleDateString("sl-SI")} ${t("hooks.pdf.generate.at")} ${new Date().toLocaleTimeString("sl-SI")}</p>
              </div>
            </div>
          </body>
        </html>`;

      const fileName =
        `customer_${customer.customer.firstName}_${customer.customer.lastName}`
          .toLowerCase()
          .replace(/\s+/g, "_");

      let PDFOptions = {
        html: htmlContent,
        fileName: fileName,
        directory: "Documents",
        base64: false,
        width: 595, // A4 width in points
        height: 842, // A4 height in points
      };

      let file = await RNHTMLtoPDF.convert(PDFOptions);

      if (!file.filePath) {
        Alert.alert(
          t("hooks.pdf.generate.generatePdfFailTitle"),
          t("hooks.pdf.generate.generatePdfFailText")
        );
        console.error("Failed to generate customer pdf: ", file);
        return;
      }

      await copyToPublicAndShare(
        file.filePath,
        false,
        customer.customer.email || undefined
      );
    } catch (error) {
      console.log("PDF failed to generate customer pdf: ", error);
      Alert.alert(
        t("hooks.pdf.generate.generatePdfFailTitle"),
        `Catch: ${t("hooks.pdf.generate.generatePdfFailText")}`
      );
    }
  };

  const generateRepairPdf = async (
    repair: RepairData,
    customer: CustomerData,
    vehicle: VehicleData
  ) => {
    try {
      if (!(await requestStoragePermission())) {
        return;
      }

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }

              body {
                font-family: 'Courier New', monospace;
                font-size: 14px;
                line-height: 1.4;
                background: #fff;
                margin: 0 auto;
                padding: 20px;
              }

              .document {
                border: 1px solid #ddd;
                padding: 20px;
                background: #fff;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }

              .header {
                text-align: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 2px solid;
              }

              .document-title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 1px;
              }

              .section {
                margin-bottom: 20px;
              }

              .section-title {
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 8px;
                text-transform: uppercase;
                border-bottom: 1px solid #ccc;
                padding-bottom: 2px;
                color: #333;
              }

              .info-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
              }

              .info-item {
                display: flex;
                margin-bottom: 8px;
              }

              .info-label {
                font-weight: bold;
                min-width: 120px;
                margin-right: 10px;
              }

              .info-value {
                flex: 1;
              }

              .repair-section {
                border: 1px solid #ddd;
                padding: 20px;
                background: #f9f9f9;
                margin-bottom: 20px;
              }

              .repair-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 2px solid #ccc;
              }

              .repair-type {
                font-weight: bold;
                text-transform: uppercase;
                font-size: 16px;
              }

              .repair-date {
                font-size: 14px;
                font-weight: bold;
              }

              .repair-price {
                font-weight: bold;
                font-size: 18px;
              }

              .services-list {
                margin: 15px 0;
              }

              .service-item {
                display: flex;
                align-items: center;
                margin-bottom: 6px;
                font-size: 13px;
              }

              .service-check {
                margin-right: 8px;
                font-weight: bold;
              }

              .repair-description, .repair-note {
                background: #e8e8e8;
                padding: 10px;
                margin: 10px 0;
                border-left: 4px solid #ccc;
                font-size: 13px;
              }

              .image-container {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                  gap: 20px;
                  margin-top: 15px;
              }

              .service-image {
                height: 200px;
                width: 200px;
                border: 1px solid #ddd;
                object-fit: cover;
              }

              .vehicle-image {
                max-width: 200px;
                max-height: 150px;
                border: 1px solid #ddd;
                margin-top: 10px;
                object-fit: cover;
              }

              .thank-you {
                text-align: center;
                margin-top: 15px;
                font-size: 14px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
              }

              .footer {
                margin-top: 20px;
                padding-top: 15px;
                border-top: 1px dashed;
                text-align: center;
                font-size: 11px;
              }

              .footer p {
                margin: 2px 0;
                font-weight: bold
              }

              @media print {
                body {
                  padding: 10px;
                }

                .document {
                  box-shadow: none;
                  border: none;
                }
              }
            </style>
          </head>
          <body>
            <div class="document">
              <div class="header">
                <div class="document-title">${t("hooks.pdf.generate.customerDocumentTitle")}</div>
              </div>

              <div class="info-grid">
                <div class="section">
                  <div class="section-title">${t("hooks.pdf.generate.customerSectionTitle")}</div>
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.name")}</div>
                    <div class="info-value">${customer.firstName}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.surname")}</div>
                    <div class="info-value">${customer.lastName}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.email")}</div>
                    <div class="info-value">${customer.email || t("hooks.pdf.generate.noData")}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.phone")}</div>
                    <div class="info-value">${customer.phone || t("hooks.pdf.generate.noData")}</div>
                  </div>
                </div>

                <div class="section"> 
                  <div class="section-title">${t("hooks.pdf.generate.vehicleSectionTitle")}</div>
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.brand")}</div>
                    <div class="info-value">${vehicle.brand}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.model")}</div>
                    <div class="info-value">${vehicle.model}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.buildYear")}</div>
                    <div class="info-value">${vehicle.buildYear || t("hooks.pdf.generate.noData")}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.vin")}</div>
                    <div class="info-value">${vehicle.vin || t("hooks.pdf.generate.noData")}</div>
                  </div>
                  ${
                    vehicle.description
                      ? `
                  <div class="info-item">
                    <div class="info-label">${t("hooks.pdf.generate.description")}</div>
                    <div class="info-value">${vehicle.description}</div>
                  </div>
                  `
                      : ""
                  }
                </div>
              </div>

              <div class="section">
                <div class="section-title">${t("hooks.pdf.generate.repairInfo")}</div>
                <div class="repair-section">
                  <div class="repair-header">
                    <div>
                      <div class="repair-type">${formatRepairType(repair.type, t)}</div>
                      <div class="repair-date">${formatDate(repair.repairDate)}</div>
                    </div>
                    <div>
                      <div class="repair-price">${formatCurrency(repair.price)}</div>
                      <div class="repair-price">${repair.kilometers ?? 0} km</div>
                    </div>
                  </div>
                    
                  ${
                    getServiceTranslation(repair.options, t).length > 0
                      ? `
                  <div class="services-list">
                    <strong>${t("hooks.pdf.generate.repairsDone")}</strong>
                    ${getServiceTranslation(repair.options, t)
                      .map(
                        (service) => `
                      <div class="service-item">
                        <span class="service-check">✓</span>
                        <span>${service}</span>
                      </div>
                    `
                      )
                      .join("")}
                  </div>
                  `
                      : ""
                  }

                  ${
                    repair.description
                      ? `
                  <div class="repair-description">
                    <strong>${t("hooks.pdf.generate.repairDescription")}</strong><br>
                    ${repair.description}
                  </div>
                  `
                      : ""
                  }

                  ${
                    repair.note
                      ? `
                  <div class="repair-note">
                    <strong>${t("hooks.pdf.generate.repairNote")}</strong><br>
                    ${repair.note}
                  </div>
                  `
                      : ""
                  }

                  ${
                    repair.images && repair.images.length > 0
                      ? `
                    <div class="section">
                      <div class="section-title">${t("hooks.pdf.generate.repairImages")}</div>
                        <div class="image-container">
                          ${repair.images
                            .map(
                              (img) => `
                              <img src="${img}" alt=${t("hooks.pdf.generate.repairImageAlt")} class="service-image">
                          `
                            )
                            .join("")}
                        </div>
                    </div>
                  `
                      : ""
                  }

                  <div class="info-item" style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #ccc;">
                    <div class="info-label">${t("hooks.pdf.generate.repairId")}</div>
                    <div class="info-value">${repair.uuid}</div>
                  </div>
                </div>
              </div>
              
              <div class="thank-you">${t("hooks.pdf.generate.thankYouNote")}</div>

              <div class="footer">
                <p>ID stranke: ${customer.uuid}</p>
                <p>${t("hooks.pdf.generate.documentGenerated")} ${new Date().toLocaleDateString("sl-SI")} ${t("hooks.pdf.generate.at")} ${new Date().toLocaleTimeString("sl-SI")}</p>
              </div>
            </div>
          </body>
        </html>`;

      const fileName = `repair_${formatRepairType(repair.type, t).toLowerCase().replace(" ", "_")}`;

      let PDFOptions = {
        html: htmlContent,
        fileName: fileName,
        directory: "Documents",
        base64: false,
        width: 595, // A4 width in points
        height: 842, // A4 height in points
      };

      let file = await RNHTMLtoPDF.convert(PDFOptions);

      if (!file.filePath) {
        Alert.alert(
          t("hooks.pdf.generate.generateRepairPdfFailTitle"),
          t("hooks.pdf.generate.generateRepairPdfFailText")
        );
        console.error("Failed to generate repair pdf: ", file);
        return;
      }

      await copyToPublicAndShare(
        file.filePath,
        true,
        customer.email || undefined
      );
    } catch (error) {
      console.log("PDF failed to generate repair pdf: ", error);
      Alert.alert(
        t("hooks.pdf.generate.generateRepairPdfFailTitle"),
        `Catch: ${t("hooks.pdf.generate.generateRepairPdfFailText")}`
      );
    }
  };

  const copyToPublicAndShare = async (
    originalPath: string,
    isRepair: boolean,
    recipient?: string
  ) => {
    try {
      const fileName = `document_${Date.now()}.pdf`;
      const publicPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;

      await RNFS.copyFile(originalPath, publicPath);

      await sharePdf(publicPath, isRepair, recipient);
    } catch (error) {
      console.log("PDF failed to copy: ", error);
    }
  };

  const sharePdf = async (
    filePath: string,
    isRepair: boolean,
    recipient?: string
  ) => {
    const fileExists = await RNFS.exists(filePath);
    if (!fileExists) {
      Alert.alert(
        t("hooks.pdf.share.shareFailTitle"),
        t("hooks.pdf.share.shareFailText")
      );
      return;
    }

    const titleStr = isRepair
      ? t("hooks.pdf.share.exportRepairTitle")
      : t("hooks.pdf.share.exportCustomerTitle");
    const subjectStr = isRepair
      ? t("hooks.pdf.share.exportRepairSubject")
      : t("hooks.pdf.share.exportCustomerSubject");
    const messageStr = isRepair
      ? `${t("hooks.pdf.share.exportRepairText")}${useUserStore.getState().firstName} ${useUserStore.getState().lastName}`
      : `${t("hooks.pdf.share.exportCustomerText")}${useUserStore.getState().firstName} ${useUserStore.getState().lastName}`;

    const shareOptions: ShareOptions = {
      email: recipient, // Customer email
      title: titleStr,
      subject: subjectStr,
      message: messageStr,
      url: `file://${filePath}`,
      type: "application/pdf",
      filename: "document.pdf",
      showAppsToView: true,
    };

    await Share.open(shareOptions);
  };

  return {
    generateCustomerPdf,
    generateRepairPdf,
  };
};
