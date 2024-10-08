import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#030303" },
        tabBarIcon: ({ focused }) => {
          let iconName: "list" | "videocam" | "musical-notes" = "videocam";
          let underline = focused
            ? { borderBottomWidth: 2, borderBottomColor: "#1e90ff" }
            : {};

          if (route.name === "audio") {
            iconName = "musical-notes";
          } else if (route.name === "video") {
            iconName = "videocam";
          } else if (route.name === "playlist") {
            iconName = "list";
          }

          return (
            <View style={[{ alignItems: "center" }, underline]}>
              <Ionicons name={iconName} size={24} color="#fff" />
            </View>
          );
        },
        tabBarShowLabel: false,
      })}
    >
      <Tabs.Screen name="audio" />
      <Tabs.Screen name="video" />
      <Tabs.Screen name="playlist" />
    </Tabs>
  );
}
