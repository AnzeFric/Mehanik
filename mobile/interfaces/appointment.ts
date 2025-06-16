import { Status } from "@/interfaces/user";

export interface GroupedAppointmentData {
  customerFirstName: string;
  customerLastName: string;
  startDateTime: Date;
  endDateTime: Date;
  status: Status;
  description: string;
  numAppointments: number;
}

export interface Appointment {
  customerFirstName: string;
  customerLastName: string;
  dateTime: Date;
  status: Status;
  description: string;
}

export interface AppointmentData {
  id: number;
  name: string;
  vehicle: string;
  dateTime: Date;
  description: string;
}

export interface MechanicAppointmentData {
  uuid: string;
  startDate: Date;
  endDate: Date;
  status: AppointmentStatus;
  mechanicResponse: string;
  mechanic: {
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

export type AppointmentStatus = "accepted" | "rejected" | "changed" | "pending";
