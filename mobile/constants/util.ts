export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months start at 0
  const day = date.getDate();

  const paddedMonth = month.toString().padStart(2, "0");
  const paddedDay = day.toString().padStart(2, "0");

  return `${paddedDay}. ${paddedMonth}. ${year}`;
}

export function formatServiceType(type: string): string {
  switch (type) {
    case "small":
      return "Mali servis";
    case "large":
      return "Veliki servis";
    default:
      return "Drugo";
  }
}

export function formatServiceItems(item: string): string {
  switch (item) {
    case "oilChange":
      return "Menjava olja";
    case "filterChange":
      return "Menjava filtra za olje";
    case "brakeCheck":
      return "Preveranje bremz";
    case "tireRotation":
      return "Centriranje gum";
    case "fluidCheck":
      return "Preverjanje tekočin";
    case "batteryCheck":
      return "Preverjanje akumulatorja";
    case "sparkPlugs":
      return "Svečke";
    case "airFilter":
      return "Zračni filter";
    case "cabinFilter":
      return "Kabinski filter";
    case "suspension":
      return "Vzmetje";
    case "timing":
      return "Jermen ali veriga";
    case "coolant":
      return "Hladilna tekočina";
    default:
      return "";
  }
}
