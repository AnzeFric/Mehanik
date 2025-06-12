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
          name="appointments"
          options={{
            title: "Appointments",
            tabBarIcon: ({ color }) => (
              <Ionicons name={"time"} color={color} size={28} />
            ),
          }}
        />
        <Tabs.Screen
          name="library/index"
          options={{
            title: "Library",
            tabBarIcon: ({ color }) => (
              <Ionicons
                name={"folder"}
                color={
                  pathName.startsWith("/library") ? staticColors.button : color
                }
                size={28}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="library/customer/[uuid]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="library/customer/add"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="library/customer/edit/[uuid]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="library/repair/[uuid]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="library/repair/add/[uuid]"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="library/repair/edit/[uuid]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
