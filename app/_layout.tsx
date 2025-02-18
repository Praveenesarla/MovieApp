import { Tabs } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import store from "../redux/store";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Tabs
          screenOptions={{ tabBarActiveTintColor: "#007AFF" }}
          screenOptions={{ headerShown: false }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Movies",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="film-outline" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="shortlist"
            options={{
              title: "Shortlist",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="heart-outline" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </QueryClientProvider>
    </Provider>
  );
}
