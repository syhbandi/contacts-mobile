import AuthProvider from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [loaded] = useFonts({
    Nunito: require("../assets/fonts/Nunito-Regular.ttf"),
    NunitoMedium: require("../assets/fonts/Nunito-Medium.ttf"),
    NunitoSemiBold: require("../assets/fonts/Nunito-SemiBold.ttf"),
    NunitoBold: require("../assets/fonts/Nunito-Bold.ttf"),
    NunitoExtraBold: require("../assets/fonts/Nunito-ExtraBold.ttf"),
  });

  const queryClient = new QueryClient();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </QueryClientProvider>
  );
}
