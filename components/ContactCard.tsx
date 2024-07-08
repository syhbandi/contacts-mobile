import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

const ContactCard = ({ contact }: { contact: any }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center px-5 py-3 space-x-3 border-b border-neutral-100"
      onPress={() => router.push("/contact/" + contact.id)}
    >
      <Image
        source={{
          uri: `https://ui-avatars.com/api/?name=${contact.first_name}&background=random&length=1`,
        }}
        className="h-12 w-12 rounded-full"
      />
      <View className="flex-1">
        <Text
          className="font-[NunitoSemiBold] text-neutral-800 text-lg"
          numberOfLines={1}
        >
          {contact.first_name} {contact.last_name}
        </Text>
        <Text className="font-[NunitoSemiBold] text-neutral-400">
          {contact.phone}
        </Text>
      </View>
      <TouchableOpacity>
        <Feather name="phone" size={20} color={"grey"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ContactCard;
