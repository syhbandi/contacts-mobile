import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const index = () => {
  const { loading, user } = useAuth();

  if (loading)
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size={"large"} color={"blue"} />
      </View>
    );
  if (!user) return <Redirect href={"/sign-in"} />;

  return <Redirect href={"/(app)"} />;
};

export default index;
