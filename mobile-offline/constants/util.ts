import { RepairOptions } from "@/interfaces/repair";

export function formatDate(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1; // Months start at 0
  const day = dateObj.getDate();

  const paddedMonth = month.toString().padStart(2, "0");
  const paddedDay = day.toString().padStart(2, "0");

  return `${paddedDay}. ${paddedMonth}. ${year}`;
}

export function formatDateTime(dateTime: Date | string): string {
  const date = dateTime instanceof Date ? dateTime : new Date(dateTime);

  const formattedDate = formatDate(date);

  const hour = date.getHours();
  const minute = date.getMinutes();

  const paddedHour = hour.toString().padStart(2, "0");
  const paddedMinute = minute.toString().padStart(2, "0");

  return `${formattedDate}, ${paddedHour}:${paddedMinute}`;
}

// (HH:MM)
export function formatTime(date: Date) {
  return (
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0")
  );
}

export function formatRepairType(type: string): string {
  switch (type) {
    case "small":
      return "Mali servis";
    case "large":
      return "Veliki servis";
    case "other":
      return "Drugo";
    default:
      return "Servis";
  }
}

export function formatRepairItems(item: string): string {
  switch (item) {
    case "oilChange":
      return "Olje";
    case "filterChange":
      return "Oljni filter";
    case "airFilter":
      return "Zračni filter";
    case "cabinFilter":
      return "Kabinski filter";
    case "frontBrakes":
      return "Sprednje zavore";
    case "backBrakes":
      return "Zadnje zavore";
    case "batteryCheck":
      return "Preverjanje akumulatorja";
    case "brakeFluid":
      return "Menjava zavorne tekočine";
    case "coolant":
      return "Dolitje hladilne tekočine";
    case "sparkPlugs":
      return "Svečke";
    case "outerTiming":
      return "Zunanji jermen";
    case "timingChain":
      return "Zobati jermen/Veriga kpl.";
    default:
      return "";
  }
}

export function formatCurrency(price: number | undefined | null): string {
  if (price && typeof price === "number") {
    return `${price.toFixed(2)} €`;
  }
  return "0.00 €";
}

export function getServiceTranslation(options: RepairOptions) {
  const serviceMap: Record<keyof RepairOptions, string> = {
    oilChange: "Olje",
    filterChange: "Oljni filter",
    airFilter: "Zračni filter",
    cabinFilter: "Kabinski filter",
    frontBrakes: "Sprednje zavore",
    backBrakes: "Zadnje zavore",
    batteryCheck: "Preverjanje akumulatorja",
    brakeFluid: "Menjava zavorne tekočine",
    coolant: "Menjava hladilne tekočine",
    sparkPlugs: "Svečke",
    outerTiming: "Zunanji jermen",
    timingChain: "Zobati jermen/Veriga kpl.",
  };

  return Object.entries(options)
    .filter(([_, value]) => value)
    .map(([key, _]) => serviceMap[key as keyof RepairOptions]);
}
