import { Tabs, usePathname } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import HomeIcon from "@/assets/icons/HomeIcon.svg";
import MechanicsIcon from "@/assets/icons/user-tabs/MechanicsIcon.svg";

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
          name="mechanics/index"
          options={{
            title: "Mechanics",
            tabBarIcon: ({ color }) => (
              <View style={{ margin: 20, padding: 20 }}>
                <MechanicsIcon
                  color={
                    pathName.startsWith("/mechanics") // Color Mechanic as active if we are on [id] page
                      ? Colors.light.specialBlue
                      : color
                  }
                  width={30}
                  height={30}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="mechanics/mechanic/[email]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="mechanics/mechanic/appointment/[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
