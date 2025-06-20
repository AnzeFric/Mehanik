export interface AppointmentData {
  startDate: Date;
  endDate: Date;
  userMessage?: string;
  mechanicResponse?: string;
  status: AppointmentStatus;
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
  vehicle: {
    brand: string;
    model: string;
    buildYear: number | null;
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

// Accepted - Mechanic accepted the appointment || User accepted the appointment after mechanic changed details
// Rejected - Mechanic rejected the appointment || User rejected the appointment after mechanic changed details
// Changed - Mechanic changed details about the appointment
// Pending - User changed details about the appointment
export type AppointmentStatus =
  | "accepted"
  | "rejected"
  | "changed"
  | "pending"
  | "unknown"
  | "hidden";
