import { Tabs, router } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
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
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 64,
          },
          sceneStyle: { backgroundColor: Colors.light.background },
          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{ borderless: false, color: "transparent" }}
            />
          ),
        })}
        backBehavior="history"
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarActiveTintColor: "#FFFFFF",
            tabBarInactiveTintColor: "#FFFFFF",
            tabBarIcon: ({ color, focused }) => (
              <View style={{ margin: 20, padding: 20 }}>
                <HomeIcon width={28} height={28} />
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
                <AppointmentsIcon width={28} height={28} />
              </View>
            ),
            headerPressColor: "white",
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            tabBarIcon: ({ color, focused }) => (
              <View style={{ margin: 20, marginTop: 23, padding: 20 }}>
                <LibraryIcon width={28} height={28} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            href: null,
            animation: "shift",
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
