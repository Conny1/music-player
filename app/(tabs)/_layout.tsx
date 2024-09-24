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
          let iconName: "home" | "search" | "book" = "home";
          let underline = focused
            ? { borderBottomWidth: 2, borderBottomColor: "#1e90ff" }
            : {};

          if (route.name === "home") {
            iconName = "home";
          } else if (route.name === "search") {
            iconName = "search";
          } else if (route.name === "library") {
            iconName = "book";
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
      <Tabs.Screen name="home" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="library" />
    </Tabs>
  );
}
