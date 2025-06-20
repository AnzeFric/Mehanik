import useAuthStore from "@/stores/useAuthStore";
import useColorThemeStore from "@/stores/useColorThemeStore";
import useUserStore from "@/stores/useUserStore";
import useAppointmentStore from "@/stores/useAppointmentStore";
import useCustomerStore from "@/stores/useCustomerStore";
import useRepairStore from "@/stores/useRepairStore";
import useVehicleStore from "@/stores/useVehicleStore";
import useMechanicStore from "@/stores/useMechanicStore";

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
    default:
      return "Drugo";
  }
}

export function formatRepairItems(item: string): string {
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

export function formatCurrency(price: number | undefined | null): string {
  if (price && typeof price === "number") {
    return `${price.toFixed(2)} €`;
  }
  return "0.00 €";
}

export function resetAllStores() {
  useAuthStore.getState().reset();
  useUserStore.getState().reset();
  useColorThemeStore.getState().reset();
  useAppointmentStore.getState().reset();
  useCustomerStore.getState().reset();
  useMechanicStore.getState().reset();
  useRepairStore.getState().reset();
  useVehicleStore.getState().reset();
}
