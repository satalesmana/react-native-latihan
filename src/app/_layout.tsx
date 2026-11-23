import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Provider } from "react-redux";
import "../../global.css";
import { supabase } from "../../lib/supabase";
import { store } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearAuth, setAuth } from "../store/slices/authSlice";

function RootNavigation() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        dispatch(setAuth({ user: session.user, session }));
      } else {
        dispatch(clearAuth());
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch(setAuth({ user: session.user, session }));
      } else {
        dispatch(clearAuth());
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(admin)";

    if (isAuthenticated && !inAuthGroup) {
      router.replace("/(admin)/home");
    } else if (!isAuthenticated && inAuthGroup) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1F41BB" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen
        name="(admin)/home/index"
        options={{
          title: "Home",
          headerBackButtonMenuEnabled: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/(admin)/profile")}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={{ marginRight: 8 }}
            >
              <MaterialCommunityIcons name="account-circle" size={26} color="#0A0A0A" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="(admin)/dompet" options={{ title: "Dompet" }} />
      <Stack.Screen
        name="(admin)/profile/index"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
