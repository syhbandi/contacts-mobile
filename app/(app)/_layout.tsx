import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { ActivityIndicator, Text, View } from "react-native";

const AppLayout = () => {
  const { user } = useAuth();

  if (!user) return <Redirect href={"/(auth)/sign-in"} />;
  return <Stack screenOptions={{ animation: "ios" }} />;
};

export default AppLayout;
