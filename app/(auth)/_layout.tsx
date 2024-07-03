import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const AuthLayout = () => {
  const { user } = useAuth();

  if (user) return <Redirect href={"/"} />;

  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
