import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useRef, useCallback } from "react";
import { AppStyles } from "@/constants/Styles";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import { router, useFocusEffect } from "expo-router";
import { AppointmentData } from "@/interfaces/user";
import Appointment from "@/components/user/items/Appointment";
import ModalAppointment from "@/components/mechanic/modals/ModalAppointment";
import ModalPrompt from "@/components/mechanic/modals/ModalPrompt";

const fakeAppointmentData: AppointmentData[] = [
  {
    id: 0,
    userId: 0,
    mechanicId: 0,
    date: new Date(),
    status: "Accepted",
    mechanic: {
      id: 0,
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      city: "New York",
      image: "john_doe.jpg",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
    },
  },
  {
    id: 1,
    userId: 0,
    mechanicId: 0,
    date: new Date(),
    status: "Pending",
    mechanic: {
      id: 0,
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      city: "New York",
      image: "john_doe.jpg",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
    },
  },
  {
    id: 1,
    userId: 0,
    mechanicId: 0,
    date: new Date(),
    status: "Rejected",
    mechanicMessage: "Ne",
    mechanic: {
      id: 0,
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      city: "New York",
      image: "john_doe.jpg",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
    },
  },
  {
    id: 1,
    userId: 0,
    mechanicId: 0,
    date: new Date(),
    status: "Changed",
    mechanicMessage: "Opis ni zadosten, pridi na pregled",
    mechanic: {
      id: 0,
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      city: "New York",
      image: "john_doe.jpg",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
    },
  },
  {
    id: 1,
    userId: 0,
    mechanicId: 0,
    date: new Date(),
    status: "Changed",
    mechanicMessage: "Pridi 10min prej",
    mechanic: {
      id: 0,
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St",
      city: "New York",
      image: "john_doe.jpg",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
    },
  },
];

export default function HomeUserScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentData | null>(null);

  const scrollRef = useRef<ScrollView>(null);

  // TODO: post to backend and get all appointments as the loggined user id
  const [appointmentList, setAppointmentList] =
    useState<Array<AppointmentData>>(fakeAppointmentData);

  const handleAppointmentPress = (appointment: AppointmentData) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const handleModalConfirm = () => {
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  // Make ScrollView return to top after screen is unfocused
  useFocusEffect(
    useCallback(() => {
      return () => {
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.scrollTo({ y: 0 });
          }
        }, 100); // For smooth transition between screens
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={AppStyles.bigTitle}>Termini</Text>
        <MenuIcon
          height={30}
          width={30}
          onPress={() => {
            router.push("/(tabs-user)/settings");
          }}
        />
      </View>
      <ScrollView style={{ paddingHorizontal: 25, flex: 1 }} ref={scrollRef}>
        <View style={styles.contentContainer}>
          {appointmentList.map((appointment, index) => (
            <Appointment
              appointmentData={appointment}
              onPress={() => handleAppointmentPress(appointment)}
              key={index}
            />
          ))}
        </View>
      </ScrollView>
      {selectedAppointment &&
        (selectedAppointment.status === "Accepted" ||
        selectedAppointment.status === "Rejected" ? (
          <ModalPrompt
            isVisible={modalVisible}
            message={"Termin boste trajno izbrisali."}
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
          />
        ) : (
          <ModalAppointment
            isVisible={modalVisible}
            title={
              selectedAppointment.status === "Pending"
                ? "Spremeni termin"
                : "Potrdi termin"
            }
            firstScreen={0}
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  contentContainer: {
    gap: 10,
    paddingTop: 15,
  },
});
