import { UserAppointmentData } from "@/interfaces/appointment";

export function useAppointment() {
  const getAppointmentAtHour = (
    appointments: UserAppointmentData[],
    hour: number
  ): UserAppointmentData | undefined => {
    return appointments.find(
      (appointment) => appointment.startDate.getHours() === hour
    );
  };

  const isAppointmentStartHour = (
    hour: number,
    appointment: UserAppointmentData
  ): boolean => {
    return appointment.startDate.getHours() === hour;
  };

  const getAppointmentHeight = (
    appointment: UserAppointmentData,
    itemHeight: number
  ): number => {
    const startHour = appointment.startDate.getHours();
    const endHour = appointment.endDate.getHours();
    const endMinutes = appointment.endDate.getMinutes();

    let duration = endHour - startHour;
    if (endMinutes > 0) {
      duration += endMinutes / 60;
    }

    return Math.ceil(duration) * itemHeight;
  };

  const isWithinAppointmentDuration = (
    hour: number,
    appointment: UserAppointmentData
  ): boolean => {
    const startHour = appointment.startDate.getHours();
    const endHour = appointment.endDate.getHours();
    const endMinutes = appointment.endDate.getMinutes();

    // Exclude last hour. If it ends at 14, only take the space between 13 and 14
    const actualEndHour = endMinutes > 0 ? endHour + 1 : endHour;

    return hour >= startHour && hour < actualEndHour;
  };

  return {
    getAppointmentAtHour,
    isAppointmentStartHour,
    getAppointmentHeight,
    isWithinAppointmentDuration,
  };
}
