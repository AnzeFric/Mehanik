export type AccountType = "user" | "mechanic";

export interface MechanicData {
  firstName: string;
  lastName: string;
  email: string;
  accountType: AccountType;
  info: {
    address: string | null;
    city: string | null;
    image: string | null;
    phone: string | null;
    prices: {
      largeRepair: BrandPrice[] | null;
      smallRepair: BrandPrice[] | null;
      tyreChange: BrandPrice[] | null;
    };
    workHours: Array<WorkHour> | null;
  };
}

export interface BrandPrice {
  name: string;
  price: string; // Using string to enable user decimal input
}

export interface WorkHour {
  day: DayType;
  isOpen: boolean;
  shifts: Array<TimeSlot>;
}

export interface TimeSlot {
  start: string;
  end: string;
}

export type PickerType = {
  index: number;
  dateTime: Date;
  isStart: boolean;
};

export type DayType = "pon" | "tor" | "sre" | "čet" | "pet" | "sob" | "ned";
