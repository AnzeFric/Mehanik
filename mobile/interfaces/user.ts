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
  };
}

export interface BrandPrice {
  name: string;
  price: string; // Using string to enable user decimal input
}
