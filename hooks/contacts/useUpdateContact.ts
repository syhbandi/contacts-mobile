import api from "@/axios/api";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert, ToastAndroid } from "react-native";

export type updateContactType = {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
};

export const useUpdateContact = (id: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  const update = async (data: updateContactType) => {
    const response = await api.put(`/contacts/${id}`, data, {
      headers: { Authorization: user.token },
    });
    return response.data;
  };

  return useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts", id] });
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
