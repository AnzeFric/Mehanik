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

export function formatCurrency(price: number | undefined | null): string {
  if (price && typeof price === "number") {
    return `${price.toFixed(2)} €`;
  }
  return "0.00 €";
}

export function formatRepairType(
  type: string,
  t: (key: string) => string
): string {
  switch (type) {
    case "small":
      return t("utils.small");
    case "large":
      return t("utils.large");
    case "other":
      return t("utils.other");
    default:
      return t("utils.default");
  }
}

// look up translation from i18n, fallback "" if key not found
export function formatRepairItems(
  item: string,
  t: (key: string) => string
): string {
  const translation = t(`utils.${item}`);
  return translation === `utils.${item}` ? "" : translation;
}

export function getServiceTranslation(
  options: RepairOptions,
  t: (key: string) => string
): string[] {
  return Object.entries(options)
    .filter(([_, value]) => value)
    .map(([key]) => t(`utils.${key}`));
}
