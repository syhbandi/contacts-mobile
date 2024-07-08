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

const SignUp = () => {
  const { signUp } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (loading || !username || !password || !name) return;

    setLoading(true);
    try {
      await signUp({ username, password, name });
      setLoading(false);
    } catch (error: any) {
      let message = error.message;

      if (error.response.data.errors.username) {
        message = error.response.data.errors.username;
      }

      Alert.alert("Ooops!", message);
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
            Sign Up
          </Text>
          <View className="gap-3">
            <TextInput
              className="h-12 bg-white border border-neutral-200 rounded-xl px-3 font-[NunitoMedium]"
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
              autoComplete="off"
            />
            <TextInput
              className="h-12 bg-white border border-neutral-200 rounded-xl px-3 font-[NunitoMedium]"
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              autoComplete="off"
              autoCapitalize="none"
            />
            <TextInput
              className="h-12 bg-white border border-neutral-200 rounded-xl px-3 font-[NunitoMedium]"
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              className="items-center justify-center h-12 bg-blue-600 rounded-xl"
              onPress={handleSignUp}
            >
              {loading ? (
                <ActivityIndicator size={"large"} color={"white"} />
              ) : (
                <Text className="font-[NunitoBold] text-base text-white">
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
            <Text className="text-center font-[NunitoMedium]">
              Already have an account?{" "}
              <Link href={"(auth)/sign-in"} className="font-[NunitoSemiBold]">
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
