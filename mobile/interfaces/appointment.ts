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
