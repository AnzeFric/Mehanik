import { AccountType } from "./account";

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
  };
}

export interface BrandPrice {
  name: string;
  price: string; // Using string to enable user decimal input
}

export interface AppointmentData {
  id: number;
  mechanicId: number;
  userId: number;
  date: Date;
  status: Status;
  mechanicMessage?: string;
  mechanic: MechanicData;
}

export type Status = "Accepted" | "Rejected" | "Changed" | "Pending";
