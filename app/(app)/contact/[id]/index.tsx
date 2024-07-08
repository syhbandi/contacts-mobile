import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import useGetContactById from "@/hooks/contacts/useGetContactById";
import { Feather } from "@expo/vector-icons";

const Detail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError } = useGetContactById(id!);
  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          title: "",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push(`/contact/${id}/edit`)}
            >
              <Feather name="edit-2" size={20} color={"gray"} />
            </TouchableOpacity>
          ),
        }}
      />
      {isLoading ? (
        <ActivityIndicator size={"large"} color={"blue"} />
      ) : isError ? (
        <Text>Oops! something happen</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="items-center mb-5 space-y-1">
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${data?.first_name}&background=random&length=1`,
              }}
              className="h-24 w-24 rounded-full mb-5"
            />
            <Text className="font-[NunitoBold] text-2xl text-neutral-800">
              {data?.first_name} {data?.last_name}
            </Text>
            <Text className="font-[NunitoSemiBold] text-neutral-500">
              {data?.phone}
            </Text>
            {data?.email && (
              <Text className="font-[NunitoMedium] text-neutral-500">
                {data?.email}
              </Text>
            )}
          </View>
          <View className="flex-row items-center justify-center space-x-5">
            <TouchableOpacity className="h-11 w-11 bg-white border border-neutral-200 rounded-full items-center justify-center">
              <Feather name="phone" size={20} color={"gray"} />
            </TouchableOpacity>
            <TouchableOpacity className="h-11 w-11 bg-white border border-neutral-200 rounded-full items-center justify-center">
              <Feather name="message-square" size={20} color={"gray"} />
            </TouchableOpacity>
            <TouchableOpacity className="h-11 w-11 bg-white border border-neutral-200 rounded-full items-center justify-center">
              <Feather name="video" size={20} color={"gray"} />
            </TouchableOpacity>
            {data?.email && (
              <TouchableOpacity className="h-11 w-11 bg-white border border-neutral-200 rounded-full items-center justify-center">
                <Feather name="mail" size={20} color={"gray"} />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Detail;
