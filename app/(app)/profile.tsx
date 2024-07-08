import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { data, isLoading, isError, error } = useGetCurrentUser();
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      setLoading(false);
    } catch (error) {
      Alert.alert("Oops!", "Sign out failed!");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShadowVisible: false, title: "" }} />
      {isLoading ? (
        <ActivityIndicator size={"large"} color={"blue"} />
      ) : isError ? (
        <Text>{error.message}</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-5">
            <View className="items-center my-5">
              <Image
                source={{
                  uri: `https://ui-avatars.com/api/?name=${data?.name}&background=random&length=1`,
                }}
                className="h-24 w-24 rounded-full"
              />
            </View>
            <View className="py-3 border-b border-neutral-200">
              <Text className="font-[NunitoMedium] text-neutral-500 text-sm">
                Name
              </Text>
              <Text className="font-[NunitoSemiBold] text-neutral-800 text-lg">
                {data?.name}
              </Text>
            </View>
            <View className="py-3 border-b border-neutral-200">
              <Text className="font-[NunitoMedium] text-neutral-500 text-sm">
                Username
              </Text>
              <Text className="font-[NunitoSemiBold] text-neutral-800 text-lg">
                {data?.username}
              </Text>
            </View>
            <TouchableOpacity
              className="rounded-xl h-12 bg-blue-600 items-center justify-center mt-5"
              onPress={handleSignOut}
            >
              {loading ? (
                <ActivityIndicator size={"large"} color={"white"} />
              ) : (
                <Text className="font-[NunitoSemiBold] text-white text-lg">
                  Sign Out
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Profile;
