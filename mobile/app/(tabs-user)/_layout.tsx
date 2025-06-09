import { Tabs, usePathname } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

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
                  pathName.startsWith("/settings")
                    ? Colors.light.specialBlue
                    : color
                }
                size={28}
              />
            ),
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
                    ? Colors.light.specialBlue
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
          name="mechanics/mechanic/appointment/[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
