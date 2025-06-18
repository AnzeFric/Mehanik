import { AppointmentData } from "@/interfaces/appointment";
import { API_BASE_URL } from "@/constants/Config";
import useAuthStore from "@/stores/useAuthStore";

export function useAppointment() {
  const { jwt } = useAuthStore();

  const saveAppointment = async (
    vehicleUuid: string,
    mechanicUuid: string,
    appointmentData: AppointmentData
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          vehicleUuid,
          mechanicUuid,
          appointmentData,
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

  return {
    saveAppointment,
  };
}
