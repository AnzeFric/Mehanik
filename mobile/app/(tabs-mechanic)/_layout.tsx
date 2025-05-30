import { Tabs, usePathname } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import HomeIcon from "@/assets/icons/HomeIcon.svg";
import AppointmentsIcon from "@/assets/icons/mechanic-tabs/AppointmentIcon.svg";
import LibraryIcon from "@/assets/icons/mechanic-tabs/LibraryIcon.svg";

export default function TabLayout() {
  const pathName = usePathname();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={() => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.light.specialBlue,
          tabBarInactiveTintColor: Colors.light.inactiveButton,
          tabBarStyle: {
            height: 64,
          },
          sceneStyle: { backgroundColor: Colors.light.background },

          // Disables android default onClick ripple effect
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
            tabBarIcon: ({ color }) => (
              <View style={{ margin: 20, padding: 20 }}>
                <HomeIcon
                  color={
                    pathName.startsWith("/settings") // Color HomeIcon as active if we are on settings page
                      ? Colors.light.specialBlue
                      : color
                  }
                  width={28}
                  height={28}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="appointments"
          options={{
            title: "Appointments",
            tabBarIcon: ({ color }) => (
              <View style={{ margin: 20, padding: 20 }}>
                <AppointmentsIcon color={color} width={28} height={28} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="library/index"
          options={{
            title: "Library",
            tabBarIcon: ({ color }) => (
              <View style={{ margin: 20, marginTop: 23, padding: 20 }}>
                <LibraryIcon
                  color={
                    pathName.startsWith("/library") // Color LibraryIcon as active if we are on detail page
                      ? Colors.light.specialBlue
                      : color
                  }
                  width={28}
                  height={28}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="library/[vin]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="library/add-customer"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="library/customer-edit/[id]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="library/service-add/[id]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="library/service-edit/[id]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="library/service/detail"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
