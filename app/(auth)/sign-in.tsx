import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import { AxiosError } from "axios";

const SignIn = () => {
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn(username, password);
      setLoading(false);
    } catch (error: any) {
      let message = error.message;

      if (error?.response?.data) {
        message = error?.response?.data?.errors?.messages;
      }

      Alert.alert("Ups!", message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="min-h-screen px-5 justify-center">
          <Text className="text-4xl font-[NunitoBold] text-center mb-10">
            Sign In
          </Text>
          <View className="gap-3">
            <TextInput
              className="h-12 bg-white border border-neutral-200 rounded-xl px-3 font-[NunitoMedium]"
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              className="h-12 bg-white border border-neutral-200 rounded-xl px-3 font-[NunitoMedium]"
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity className="self-end">
              <Text className="font-[NunitoMedium]">Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="items-center justify-center h-12 bg-blue-600 rounded-xl"
              onPress={handleSignIn}
            >
              {loading ? (
                <ActivityIndicator size={"large"} color={"white"} />
              ) : (
                <Text className="font-[NunitoBold] text-base text-white">
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
            <Text className="text-center font-[NunitoMedium]">
              Don't have an account?{" "}
              <Link href={"(auth)/sign-up"} className="font-[NunitoSemiBold]">
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
