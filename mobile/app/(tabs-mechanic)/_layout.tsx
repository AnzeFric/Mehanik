import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import HomeIcon from "@/assets/icons/HomeIcon.svg";
import AppointmentsIcon from "@/assets/icons/mechanic-tabs/AppointmentIcon.svg";
import LibraryIcon from "@/assets/icons/mechanic-tabs/LibraryIcon.svg";

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: Colors["light"].tint,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 64,
          },
        })}
        backBehavior="history"
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <View style={{ margin: 20, padding: 20 }}>
                <HomeIcon color={Colors.light.tint} width={28} height={28} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="appointments"
          options={{
            title: "Appointments",
            tabBarIcon: ({ color, focused }) => (
              <View style={{ margin: 20, padding: 20 }}>
                <AppointmentsIcon
                  color={Colors.light.tint}
                  width={28}
                  height={28}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            tabBarIcon: ({ color, focused }) => (
              <View style={{ margin: 20, marginTop: 23, padding: 20 }}>
                <LibraryIcon color={Colors.light.tint} width={28} height={28} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
