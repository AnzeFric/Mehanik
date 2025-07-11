import RNHTMLtoPDF from "react-native-html-to-pdf";
import { Alert, PermissionsAndroid } from "react-native";
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

  const generateCustomerPdf = async (customer: CustomerFormData) => {
    try {
      if (!(await requestStoragePermission())) {
        return;
      }

      const repairs = customer.repairs || [];
      const totalRepairs = repairs.length;
      const totalCost = repairs.reduce(
        (sum, repair) => sum + (repair.price || 0),
        0
      );

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
                margin-bottom: 20px;
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

              .summary-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
                text-align: center;
                margin-bottom: 20px;
              }

              .summary-item {
                padding: 10px;
                background: white;
                border: 1px solid #ddd;
              }

              .summary-number {
                font-size: 20px;
                font-weight: bold;
              }

              .summary-label {
                font-size: 12px;
                text-transform: uppercase;
                margin-top: 5px;
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
                <div class="document-title">POROČILO STRANKE</div>
              </div>

              <div class="info-grid">
                <div class="section">
                  <div class="section-title">Podatki stranke</div>
                  <div class="info-item">
                    <div class="info-label">Ime:</div>
                    <div class="info-value">${customer.customer.firstName}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Priimek:</div>
                    <div class="info-value">${customer.customer.lastName}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Email:</div>
                    <div class="info-value">${customer.customer.email || "Ni podatka"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Telefon:</div>
                    <div class="info-value">${customer.customer.phone || "Ni podatka"}</div>
                  </div>
                </div>

                <div class="section"> 
                  <div class="section-title">Podatki vozila</div>
                  <div class="info-item">
                    <div class="info-label">Znamka:</div>
                    <div class="info-value">${customer.vehicle.brand}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Model:</div>
                    <div class="info-value">${customer.vehicle.model}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Leto:</div>
                    <div class="info-value">${customer.vehicle.buildYear || "Ni podatka"}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">VIN:</div>
                    <div class="info-value">${customer.vehicle.vin || "Ni podatka"}</div>
                  </div>
                  ${
                    customer.vehicle.description
                      ? `
                  <div class="info-item">
                    <div class="info-label">Opis:</div>
                    <div class="info-value">${customer.vehicle.description}</div>
                  </div>
                  `
                      : ""
                  }
                  ${
                    customer.vehicle.image
                      ? `
                  <div class="info-item">
                    <img src="${customer.vehicle.image}" alt="Slika vozila" class="vehicle-image">
                  </div>
                  `
                      : ""
                  }
                </div>
              </div>
                
              <div class="section-title">Povzetek servisov</div>
              <div class="summary-grid">
                <div class="summary-item">
                  <div class="summary-number">${totalRepairs}</div>
                  <div class="summary-label">Skupaj servisov</div>
                </div>
                <div class="summary-item">
                  <div class="summary-number">${formatCurrency(totalCost)}</div>
                  <div class="summary-label">Skupni stroški</div>
                </div>
                <div class="summary-item">
                  <div class="summary-number">${totalRepairs > 0 ? formatCurrency(totalCost / totalRepairs) : "€0,00"}</div>
                  <div class="summary-label">Povprečni stroški</div>
                </div>
              </div>
                
              <div class="section">
                <div class="section-title">Seznam servisov</div>
                ${
                  repairs.length > 0
                    ? repairs
                        .map((repair) => {
                          const completedServices = getServiceTranslation(
                            repair.options
                          );
                          return `
                    <div class="repair-item">
                      <div class="repair-header">
                        <div>
                          <div class="repair-type">${formatRepairType(repair.type)}</div>
                          <div class="repair-date">${formatDate(repair.repairDate)}</div>
                        </div>
                        <div class="repair-price">${formatCurrency(repair.price)}</div>
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
                        <strong>Opis dodatnih del:</strong><br>
                        ${repair.description}
                      </div>
                      `
                          : ""
                      }

                      ${
                        repair.note
                          ? `
                      <div class="repair-note">
                        <strong>Opombe:</strong><br>
                        ${repair.note}
                      </div>
                      `
                          : ""
                      }

                      ${
                        repair.images && repair.images.length > 0
                          ? `
                        <div class="section">
                          <div class="section-title">Slike servisa</div>
                            <div class="image-container">
                              ${repair.images
                                .map(
                                  (img) => `
                                  <img src="${img}" alt="Slika servisa" class="service-image">
                              `
                                )
                                .join("")}
                            </div>
                        </div>
                      `
                          : ""
                      }

                      <div class="info-item">
                        <div class="info-label">ID servisa:</div>
                        <div class="info-value">${repair.uuid}</div>
                      </div>
                    </div>
                  `;
                        })
                        .join("")
                    : `
                  <div class="no-repairs">
                    Ni zabeleženih servisov za to stranko.
                  </div>
                `
                }
              </div>
              
              <div class="footer">
                <p>ID stranke: ${customer.customer.uuid}</p>
                <p>Dokument generiran: ${new Date().toLocaleDateString("sl-SI")} ob ${new Date().toLocaleTimeString("sl-SI")}</p>
              </div>
            </div>
          </body>
        </html>`;

      const fileName =
        `stranka_${customer.customer.firstName}_${customer.customer.lastName}`
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
        Alert.alert("Napaka", "PDF datoteka za stranko ni bila zgenerirana");
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
      Alert.alert("Napaka", "Prišlo je do napake pri generiranju PDF datoteke");
    }
  };

  const generateRepairPdf = async (
    repair: RepairData,
    customer: CustomerData
  ) => {
    try {
      if (!(await requestStoragePermission())) {
        return;
      }

      const completedServices = getServiceTranslation(repair.options);

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

              .receipt {
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

              .business-name {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 5px;
                text-transform: uppercase;
                letter-spacing: 1px;
              }

              .receipt-title {
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 10px;
                text-transform: uppercase;
              }

              .receipt-info {
                font-size: 12px;
                font-weight: bold
              }

              .section {
                margin-bottom: 15px;
              }

              .section-title {
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 8px;
                text-transform: uppercase;
                border-bottom: 1px solid #ccc;
                padding-bottom: 2px;
              }

              .item-row {
                display: flex;
                justify-content: space-between;
                padding: 3px 0;
                font-size: 13px;
              }

              .item-name {
                flex: 1;
                margin-right: 10px;
              }

              .item-price {
                font-weight: bold;
                white-space: nowrap;
              }

              .no-items {
                font-style: italic;
                text-align: center;
                padding: 10px 0;
              }

              .total-section {
                margin-top: 15px;
                padding-top: 10px;
                border-top: 2px solid;
              }

              .total-row {
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                font-weight: bold;
                padding: 5px 0;
              }

              .description-section, .notes-section {
                background: #e8e8e8;
                padding: 10px;
                border-left: 3px solid;
                margin: 15px 0;
              }

              .description-section p, .notes-section p {
                margin: 0;
                font-size: 12px;
                line-height: 1.5;
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

              .thank-you {
                text-align: center;
                margin-top: 15px;
                font-size: 14px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
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

              @media print {
                body {
                  padding: 10px;
                }

                .receipt {
                  box-shadow: none;
                  border: none;
                }
              }
            </style>
          </head>
          <body>
            <div class="receipt">
              <div class="header">
                <div class="receipt-title">SERVISNO POROČILO</div>
                <div class="receipt-info">
                  Tip: ${formatRepairType(repair.type)}<br>
                  Datum: ${formatDate(repair.repairDate)}
                </div>
              </div>

              <div class="section">
                <div class="section-title">Opravljene storitve</div>
                ${
                  completedServices.length > 0
                    ? completedServices
                        .map(
                          (service) => `
                          <div class="item-row">
                            <div class="item-name">${service}</div>
                            <div class="item-price">✓</div>
                          </div>
                        `
                        )
                        .join("")
                    : `<div class="no-items">Ni opravljenih storitev</div>`
                }
              </div>

              <div class="total-section">
                <div class="total-row">
                  <div>SKUPAJ:</div>
                  <div>${formatCurrency(repair.price)}</div>
                </div>
              </div>
              
              ${
                repair.description
                  ? `
                  <div class="description-section">
                    <div class="section-title">Opis dodatnih del</div>
                    <p>${repair.description}</p>
                  </div>
                `
                  : ""
              }

              ${
                repair.note
                  ? `
                  <div class="notes-section">
                    <div class="section-title">Opombe</div>
                    <p>${repair.note}</p>
                  </div>
                `
                  : ""
              }

              ${
                repair.images && repair.images.length > 0
                  ? `
                <div class="section">
                  <div class="section-title">Slike servisa</div>
                    <div class="image-container">
                      ${repair.images
                        .map(
                          (img) => `
                          <img src="${img}" alt="Slika servisa" class="service-image">
                      `
                        )
                        .join("")}
                    </div>
                </div>
              `
                  : ""
              }

              <div class="thank-you">HVALA ZA ZAUPANJE!</div>

              <div class="footer">
                <p>Izdano: ${new Date().toLocaleDateString("sl-SI")} ${new Date().toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" })}</p>
                <p>ID računa: ${repair.uuid}</p>
              </div>
            </div>
          </body>
        </html>`;

      const fileName = `servis_${formatRepairType(repair.type).toLowerCase().replace(" ", "_")}`;

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
        Alert.alert("Napaka", "PDF datoteka za servis ni bila zgenerirana");
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
      Alert.alert("Napaka", "Prišlo je do napake pri generiranju PDF datoteke");
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
      Alert.alert("Napaka", "PDF datoteka ni bila najdena");
      return;
    }

    const titleStr = isRepair ? "Izvoz servisa" : "Izvoz stranke";
    const subjectStr = isRepair ? "Servis za vozilo" : "Servisi za vozilo";
    const messageStr = isRepair
      ? `V prilogi je izvožen servis za vaše vozilo\n\nLp,\n${process.env.EXPO_PUBLIC_AUTO_MECHANIC}`
      : `V prilogi so izvoženi servisi za vaše vozilo\n\nLp,\n${process.env.EXPO_PUBLIC_AUTO_MECHANIC}`;

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
