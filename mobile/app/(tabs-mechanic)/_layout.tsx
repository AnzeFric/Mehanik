import { Tabs, usePathname } from "expo-router";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";
import { useEffect } from "react";
import useUserStore from "@/stores/accounts/useUserStore";
import { usePushNotification } from "@/hooks/utils/usePushNotification";

export default function TabLayout() {
  const pathName = usePathname();
  const { staticColors } = useAnimatedTheme();

  const { currentUser } = useUserStore();
  const { initializeNotifications } = usePushNotification();

  useEffect(() => {
    initializeNotifications();
  }, [currentUser]);

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
              onPress={props.onPress}
              onLongPress={props.onLongPress}
              testID={props.testID}
              accessibilityLabel={props.accessibilityLabel}
              accessibilityRole={props.accessibilityRole}
              accessibilityState={props.accessibilityState}
              style={[
                props.style,
                {
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
              android_ripple={{ borderless: false, color: "transparent" }}
            >
              {props.children}
            </Pressable>
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
          name="library/repair/index"
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
          name="library/repair/edit"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
