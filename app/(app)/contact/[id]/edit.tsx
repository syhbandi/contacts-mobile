import {
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native";
import useGetContactById from "@/hooks/contacts/useGetContactById";
import {
  updateContactType,
  useUpdateContact,
} from "@/hooks/contacts/useUpdateContact";

const EditContact = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError } = useGetContactById(id!);
  const [formData, setFormData] = useState<updateContactType>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const update = useUpdateContact(id!);

  const handleSubmit = () => {
    if (update.isPending) return;
    if (!formData.first_name || !formData.phone) {
      Alert.alert("Oops!", "Data is invalid");
      return;
    }
    update.mutate(formData);
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerTitle: () => (
            <Text className="text-xl font-[NunitoBold] text-neutral-80">
              Edit Contact
            </Text>
          ),
          headerShadowVisible: false,
        }}
      />
      {isLoading ? (
        <ActivityIndicator size={"large"} color={"blue"} />
      ) : isError ? (
        <Text className="text-red-600 my-3 text-center text-base font-[NunitoSemiBold]">
          Could not load contact
        </Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="space-y-5 px-5 py-5">
            <View className="space-y-2">
              <Text className="font-[NunitoSemiBold] text-neutral-800">
                First Name<Text className="text-red-600">*</Text>
              </Text>
              <TextInput
                value={formData.first_name}
                textContentType="name"
                placeholder="First Name"
                className="font-[NunitoSemiBold] h-12 bg-white border border-neutral-200 rounded-xl px-3"
                onChangeText={(text) =>
                  setFormData((current) => ({ ...current, first_name: text }))
                }
                autoComplete="off"
              />
            </View>
            <View className="space-y-2">
              <Text className="font-[NunitoSemiBold] text-neutral-800">
                Last Name
              </Text>
              <TextInput
                value={formData.last_name}
                textContentType="name"
                placeholder="Last Name"
                className="font-[NunitoSemiBold] h-12 bg-white border border-neutral-200 rounded-xl px-3"
                onChangeText={(text) =>
                  setFormData((current) => ({ ...current, last_name: text }))
                }
                autoComplete="off"
              />
            </View>
            <View className="space-y-2">
              <Text className="font-[NunitoSemiBold] text-neutral-800">
                Email
              </Text>
              <TextInput
                autoCapitalize="none"
                value={formData.email}
                textContentType="emailAddress"
                placeholder="Email"
                className="font-[NunitoSemiBold] h-12 bg-white border border-neutral-200 rounded-xl px-3"
                onChangeText={(text) =>
                  setFormData((current) => ({ ...current, email: text }))
                }
                autoComplete="off"
              />
            </View>
            <View className="space-y-2">
              <Text className="font-[NunitoSemiBold] text-neutral-800">
                Phone<Text className="text-red-600">*</Text>
              </Text>
              <TextInput
                value={formData.phone}
                autoComplete="off"
                keyboardType="phone-pad"
                placeholder="Phone"
                className="font-[NunitoSemiBold] h-12 bg-white border border-neutral-200 rounded-xl px-3"
                onChangeText={(text) =>
                  setFormData((current) => ({ ...current, phone: text }))
                }
              />
            </View>

            <TouchableOpacity
              className="h-12 bg-blue-600 items-center justify-center rounded-xl"
              onPress={handleSubmit}
            >
              {update.isPending ? (
                <ActivityIndicator size={"large"} color={"white"} />
              ) : (
                <Text className="font-[NunitoSemiBold] text-white text-lg">
                  Save
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default EditContact;
