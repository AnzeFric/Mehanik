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
