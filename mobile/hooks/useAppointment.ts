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

  const getAppointments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments`, {
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
      console.log("Error fetching appointments: ", data.message);
      return [];
    } catch (error) {
      console.error("Error while fetching appointment: ", error);
    }
  };

  return {
    saveAppointment,
    getAppointments,
  };
}
