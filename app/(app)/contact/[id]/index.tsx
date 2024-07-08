import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import useGetContactById from "@/hooks/contacts/useGetContactById";
import { Feather } from "@expo/vector-icons";
import { useDeleteContact } from "@/hooks/contacts/useDeleteContact";

const Detail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError } = useGetContactById(id!);
  const { mutate, isPending } = useDeleteContact(id!);

  const handleDelete = () => {
    if (isPending) return;
    Alert.alert("Alert!", "Are you sure want to delete this contact?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Yes", onPress: () => mutate() },
    ]);
  };

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
          <View className="items-center mb-5 space-y-1 px-5">
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${data?.first_name}&background=random&length=1`,
              }}
              className="h-24 w-24 rounded-full mb-5"
            />
            <Text className="font-[NunitoBold] text-2xl text-neutral-800 text-center">
              {data?.first_name} {data?.last_name}
            </Text>
            <Text className="font-[NunitoSemiBold] text-neutral-500 text-center">
              {data?.phone}
            </Text>
            {data?.email && (
              <Text className="font-[NunitoMedium] text-neutral-500 text-center">
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
          <TouchableOpacity
            className="mt-10 mx-5 rounded-xl bg-red-50 h-12 items-center justify-center flex-row space-x-3"
            onPress={handleDelete}
          >
            {isPending ? (
              <ActivityIndicator size={"large"} color={"red"} />
            ) : (
              <>
                <Feather name="trash" size={16} color={"red"} />
                <Text className="font-[NunitoSemiBold] text-red-600 text-base">
                  Delete
                </Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};

export default Detail;
