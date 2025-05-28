import { GroupedAppointmentData, Appointment } from "@/interfaces/appointment";

export function useAppointment() {
  const days = ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"];

  const groupAppointments = (
    appointments: Appointment[]
  ): GroupedAppointmentData[] => {
    // Sort appointments by date and time
    const sortedAppointments = [...appointments].sort(
      (a, b) => a.dateTime.getTime() - b.dateTime.getTime()
    );

    const groupedArr: GroupedAppointmentData[] = [];
    let currentGroup: GroupedAppointmentData | null = null;

    sortedAppointments.forEach((appointment) => {
      // Standarize date for comparison (YYYY-MM-DD)
      const appointmentDate = appointment.dateTime.toISOString().split("T")[0];
      const currentGroupDate = currentGroup?.startDateTime
        .toISOString()
        .split("T")[0];

      // Check if we should start a new group
      const shouldStartNewGroup =
        !currentGroup ||
        currentGroup.customerFirstName !== appointment.customerFirstName ||
        currentGroup.customerLastName !== appointment.customerLastName ||
        appointmentDate !== currentGroupDate ||
        // Check if appointments are NOT consecutive (more than 1 hour gap)
        appointment.dateTime.getTime() - currentGroup.endDateTime.getTime() > 0;

      if (shouldStartNewGroup) {
        // Add the previous group if it exists
        if (currentGroup) {
          groupedArr.push(currentGroup);
        }

        // Start a new group
        currentGroup = {
          customerFirstName: appointment.customerFirstName,
          customerLastName: appointment.customerLastName,
          startDateTime: appointment.dateTime,
          endDateTime: new Date(
            appointment.dateTime.getTime() + 60 * 60 * 1000 // Add 1 hour
          ),
          status: appointment.status,
          description: appointment.description,
          numAppointments: 1,
        };
      } else {
        if (currentGroup) {
          // Extend the current group end time
          currentGroup.endDateTime = new Date(
            appointment.dateTime.getTime() + 60 * 60 * 1000
          );
          // Increment the appointment count
          currentGroup.numAppointments += 1;
        }
      }
    });

    if (currentGroup) {
      groupedArr.push(currentGroup);
    }

    return groupedArr;
  };

  // Check if an appointment exists at a specific hour
  const getAppointmentAtHour = (
    groupedAppointments: GroupedAppointmentData[],
    hour: number
  ) => {
    return groupedAppointments.find((app) => {
      const startHour = app.startDateTime.getHours();
      const endHour = app.endDateTime.getHours();
      return hour >= startHour && hour < endHour;
    });
  };

  // Check if this is the start hour of an appointment
  const isAppointmentStartHour = (
    hour: number,
    appointment: GroupedAppointmentData
  ) => {
    return appointment.startDateTime.getHours() === hour;
  };

  return {
    days,
    groupAppointments,
    getAppointmentAtHour,
    isAppointmentStartHour,
  };
}
