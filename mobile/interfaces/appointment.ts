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

export interface AppointmentData {
  uuid: string;
  date: Date;
  status: AppointmentStatus;
  userMessage: string;
  mechanicResponse: string;
}

export type AppointmentStatus = "Accepted" | "Rejected" | "Changed" | "Pending";
