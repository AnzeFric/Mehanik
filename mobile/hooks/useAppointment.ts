import { AppointmentData } from "@/interfaces/appointment";
import { API_BASE_URL } from "@/constants/Config";
import useAuthStore from "@/stores/useAuthStore";

export function useAppointment() {
  const { jwt } = useAuthStore();

  const saveAppointment = async (
    vehicleUuid: string,
    mechanicEmail: string,
    appointmentData: AppointmentData
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments`, {
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
      });

      const data = await response.json();

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
      const response = await fetch(`${API_BASE_URL}/appointments/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });

      const data = await response.json();

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
      const response = await fetch(`${API_BASE_URL}/appointments/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ mechanicEmail }),
      });

      const data = await response.json();

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
      const response = await fetch(`${API_BASE_URL}/appointments/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      });

      const data = await response.json();

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

  const updateAppointment = async (appointmentData: AppointmentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ appointmentData: appointmentData }),
      });

      const data = await response.json();

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
      const response = await fetch(`${API_BASE_URL}/appointments/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({ appointmentUuid: appointmentUuid }),
      });

      const data = await response.json();

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
