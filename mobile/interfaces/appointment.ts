export interface AppointmentData {
  startDate: Date;
  endDate: Date;
  userMessage: string;
  status: AppointmentStatus;
}

export interface MechanicAppointmentData {
  uuid: string;
  startDate: Date;
  endDate: Date;
  status: AppointmentStatus;
  mechanicResponse: string;
  mechanic?: {
    firstName: string;
    lastName: string;
    email: string;
    address: string | null;
    city: string | null;
    phone: string | null;
  };
}

export interface UserAppointmentData {
  uuid: string;
  startDate: Date;
  endDate: Date;
  status: AppointmentStatus;
  userMessage: string;
  numAppointments: number;
  new: boolean;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  vehicle: {
    brand: string;
    model: string;
    buildYear: number | null;
  };
}

export type AppointmentStatus =
  | "accepted"
  | "rejected"
  | "changed"
  | "pending"
  | "unknown";
