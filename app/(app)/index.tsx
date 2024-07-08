import {
  View,
  Text,
  Button,
  Alert,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, Stack, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import ContactsList from "@/components/ContactsList";
import { useDebounce } from "use-debounce";

const Home = () => {
  const { user, signOut } = useAuth();
  const [search, setSearch] = useState("");
  const [searchDebounce] = useDebounce(search, 1000);
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
      Alert.alert("ups!", JSON.stringify(error));
    }
  };

  const showToast = () => {
    ToastAndroid.showWithGravity(
      "Ini toast",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  };
  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: () => (
            <Text className="font-[NunitoBold] text-2xl">Contact App</Text>
          ),
          headerRight: () => (
            <View className="flex-row space-x-3 items-center">
              <Link href={"/contact/create"} asChild>
                <Feather name="plus" size={24} color={"blue"} />
              </Link>
              <TouchableOpacity onPress={() => router.push("/profile")}>
                <Image
                  source={{
                    uri: `https://ui-avatars.com/api/?name=${user.name}&background=random&length=1`,
                  }}
                  className="h-10 w-10 rounded-full"
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <View className="px-5 my-5">
        <View className="flex-row items-center px-3 space-x-2 border border-neutral-200 rounded-xl">
          <Feather name="search" size={20} color={"gray"} />
          <TextInput
            className="h-12 flex-1 font-[NunitoMedium] text-base"
            placeholder="Search"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </View>
      </View>
      <ContactsList search={searchDebounce} />
    </View>
  );
};

export default Home;
