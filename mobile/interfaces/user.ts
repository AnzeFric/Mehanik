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
  name: VehicleBrand | string;
  price: number;
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

export type VehicleBrand =
  | "Audi"
  | "BMW"
  | "Citroen"
  | "Ford"
  | "Mercedes Benz"
  | "Opel"
  | "Peugeot"
  | "Renault"
  | "Škoda"
  | "Volkswagen"
  | "Abarth"
  | "AEV"
  | "Aito"
  | "Aiways"
  | "Aixam"
  | "Alfa Romeo"
  | "Alpine"
  | "Artega"
  | "Aston Martin"
  | "Austin"
  | "Autobianchi"
  | "Bentley"
  | "Bertone"
  | "Borgward"
  | "Brilliance"
  | "Bugatti"
  | "Buick"
  | "BYD"
  | "Cadillac"
  | "Casalini"
  | "Caterham"
  | "Chatenet"
  | "Chevrolet"
  | "Chrysler"
  | "Cobra"
  | "Cupra"
  | "Dacia"
  | "Daewoo"
  | "DAF"
  | "Daihatsu"
  | "DFSK"
  | "DKW"
  | "Dodge"
  | "Donkervoort"
  | "Dongfeng"
  | "DR"
  | "DS Automobiles"
  | "EV"
  | "EVO"
  | "Ferrari"
  | "Fiat"
  | "Fisker"
  | "Forthing"
  | "Geely"
  | "Genesis"
  | "GMC"
  | "Greatwall"
  | "Grecav"
  | "Hansa"
  | "Honds"
  | "Hongqi"
  | "Hummer"
  | "Hyundai"
  | "Infiniti"
  | "Iso"
  | "Isuzu"
  | "Iveco"
  | "JAC"
  | "Jaguar"
  | "JBA"
  | "JDM"
  | "Jeep"
  | "Kia"
  | "KG Mobility"
  | "KTM"
  | "Lada"
  | "Lamborghini"
  | "Lancia"
  | "Land Rover"
  | "LandWind"
  | "Lexus"
  | "Leapmotor"
  | "Ligier"
  | "Lincoln"
  | "London Taxi"
  | "Lotus"
  | "LuAZ"
  | "Lynk&Co"
  | "Mahindra"
  | "Maruti"
  | "Maserati"
  | "Maybach"
  | "Mazda"
  | "McLaren"
  | "MG"
  | "Microcar"
  | "Mini"
  | "Mitsubishi"
  | "Morgan"
  | "Moskvič"
  | "MPM Motors"
  | "Nissan"
  | "NSU"
  | "Oldsmobile"
  | "Piaggio"
  | "Plymouth"
  | "Polestar"
  | "Pontiac"
  | "Porsche"
  | "Proton"
  | "Puch"
  | "Replica"
  | "Rolls Royce"
  | "Rosengart"
  | "Rover"
  | "Saab"
  | "Saturn"
  | "SEAT"
  | "Seres"
  | "Shuanghuan"
  | "Simca"
  | "Singer"
  | "Smart"
  | "Spyker"
  | "SsangYong"
  | "Subaru"
  | "Suzuki"
  | "Talbot"
  | "Tata"
  | "Tavria"
  | "Tazzari"
  | "Tesla"
  | "Tiger"
  | "Toyota"
  | "Trabant"
  | "Triumph"
  | "TVR"
  | "UAZ"
  | "Vauxhall"
  | "Venturi"
  | "Volga"
  | "Volvo"
  | "Voyah"
  | "Wartburg"
  | "Westfield"
  | "Wiesmann"
  | "XEV"
  | "Xiaomi"
  | "Xpeng"
  | "Zastava"
  | "ZAZ"
  | "Zhidou";
