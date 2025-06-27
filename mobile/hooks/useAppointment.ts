import { AppointmentData } from "@/interfaces/appointment";
import { API_BASE_URL } from "@/constants/config";
import useAuthStore from "@/stores/accounts/useAuthStore";

type SentFromType = "user" | "mechanic";

export function useAppointment() {
  const { jwt } = useAuthStore();

  const saveAppointment = async (
    vehicleUuid: string,
    mechanicEmail: string,
    appointmentData: AppointmentData
  ) => {
    try {
      const data = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          vehicleUuid: vehicleUuid,
          mechanicEmail: mechanicEmail,
          appointmentData: appointmentData,
        }),
      }).then((response) => response.json());

      if (data.success) {
        return true;
      }
      console.log("Error saving appointment: ", data.message);
      return false;
    } catch (error) {
      console.error("Error while saving appointment: ", error);
    }
  };

  const getMechanicAppointments = async () => {
    try {
      const data = await fetch(`${API_BASE_URL}/appointments/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      }).then((response) => response.json());

      if (data.success) {
        // Convert date strings to Date objects
        const convertedAppointments = data.appointments.map(
          (appointment: any) => ({
            ...appointment,
            startDate: new Date(appointment.startDate),
            endDate: new Date(appointment.endDate),
          })
        );

        return convertedAppointments;
      }
      console.log("Error fetching mechanic appointments: ", data.message);
      return [];
    } catch (error) {
      console.error("Error while fetching mechanic appointment: ", error);
    }
  };

  const getPrivateMechanicAppointments = async (mechanicEmail: string) => {
    try {
      const data = await fetch(`${API_BASE_URL}/appointments/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ mechanicEmail }),
      }).then((response) => response.json());

      if (data.success) {
        // Convert date strings to Date objects
        const convertedAppointments = data.appointments.map(
          (appointment: any) => ({
            startDate: new Date(appointment.startDate),
            endDate: new Date(appointment.endDate),
            userMessage: "",
            status: "unknown",
          })
        );

        return convertedAppointments;
      }
      console.log("Error fetching private appointments: ", data.message);
      return [];
    } catch (error) {
      console.error("Error while fetching private appointment: ", error);
    }
  };

  const getUserAppointments = async () => {
    try {
      const data = await fetch(`${API_BASE_URL}/appointments/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      }).then((response) => response.json());

      if (data.success) {
        // Convert date strings to Date objects
        const convertedAppointments = data.appointments.map(
          (appointment: any) => ({
            ...appointment,
            startDate: new Date(appointment.startDate),
            endDate: new Date(appointment.endDate),
          })
        );

        return convertedAppointments;
      }
      console.log("Error fetching user appointments: ", data.message);
      return [];
    } catch (error) {
      console.error("Error while fetching user appointment: ", error);
    }
  };

  const updateAppointment = async (
    appointmentData: AppointmentData,
    sentFrom: SentFromType
  ) => {
    try {
      const data = await fetch(`${API_BASE_URL}/appointments/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          appointmentData: appointmentData,
          sentFrom: sentFrom,
        }),
      }).then((response) => response.json());

      if (data.success) {
        return true;
      }
      console.log("Error updating appointment: ", data.message);
      return false;
    } catch (error) {
      console.error("Error while updating appointment: ", error);
    }
  };

  const deleteAppointment = async (appointmentUuid: string) => {
    try {
      const data = await fetch(`${API_BASE_URL}/appointments/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ appointmentUuid: appointmentUuid }),
      }).then((response) => response.json());

      if (data.success) {
        return true;
      }
      console.log("Error deleting appointment: ", data.message);
      return false;
    } catch (error) {
      console.error("Error while deleting appointment: ", error);
    }
  };

  return {
    saveAppointment,
    updateAppointment,
    getMechanicAppointments,
    getPrivateMechanicAppointments,
    getUserAppointments,
    deleteAppointment,
  };
}
