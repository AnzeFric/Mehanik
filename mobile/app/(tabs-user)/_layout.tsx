import { Tabs, usePathname } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

export default function TabLayout() {
  const pathName = usePathname();
  const { staticColors } = useAnimatedTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={() => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: staticColors.button,
          tabBarInactiveTintColor: staticColors.inactiveButton,
          tabBarStyle: {
            height: 64,
            backgroundColor: staticColors.secondaryBackground,
            borderColor: staticColors.secondaryBackground,
          },

          // Disables android default onClick ripple effect
          tabBarButton: (props) => (
            <Pressable
              {...props}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
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
              <Ionicons
                name={"home"}
                color={
                  pathName.startsWith("/settings") ? staticColors.button : color
                }
                size={28}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="vehicles/index"
          options={{
            title: "Vehicles",
            tabBarIcon: ({ color }) => (
              <Ionicons
                name={"car"}
                color={
                  pathName.startsWith("/vehicles") ? staticColors.button : color
                }
                size={30}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="vehicles/vehicle/add"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="vehicles/vehicle/[uuid]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="mechanics/index"
          options={{
            title: "Mechanics",
            tabBarIcon: ({ color }) => (
              <Ionicons
                name={"people"}
                color={
                  pathName.startsWith("/mechanics")
                    ? staticColors.button
                    : color
                }
                size={28}
              />
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
          name="mechanics/mechanic/appointment/[email]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
