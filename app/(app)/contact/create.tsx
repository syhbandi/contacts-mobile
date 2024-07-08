import {
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import {
  useCreateContact,
  createContactType,
} from "@/hooks/contacts/useCreateContact";

const Create = () => {
  const [formData, setFormData] = useState<createContactType>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const createContact = useCreateContact();

  const handleSubmit = () => {
    if (createContact.isPending) return;
    if (!formData.first_name || !formData.phone) {
      Alert.alert("Oops!", "Data is invalid");
      return;
    }
    createContact.mutate(formData);
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerTitle: () => (
            <Text className="text-xl font-[NunitoBold] text-neutral-80">
              Add Contact
            </Text>
          ),
          headerShadowVisible: false,
        }}
      />
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
            {createContact.isPending ? (
              <ActivityIndicator size={"large"} color={"white"} />
            ) : (
              <Text className="font-[NunitoSemiBold] text-white text-lg">
                Save
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Create;
