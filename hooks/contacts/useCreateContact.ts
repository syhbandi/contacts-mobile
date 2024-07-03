import api from "@/axios/api";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert, ToastAndroid } from "react-native";

export type createContactType = {
  first_name: string;
  last_name?: string;
  email?: string;
  phone: string;
};

export const useCreateContact = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  const createContact = async (data: createContactType) => {
    const response = await api.post("/contacts", data, {
      headers: { Authorization: user.token },
    });
    return response.data;
  };

  return useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      ToastAndroid.showWithGravity(
        "contact created",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      router.back();
    },
    onError: (error) => {
      Alert.alert("Oops!", error.message);
    },
  });
};
