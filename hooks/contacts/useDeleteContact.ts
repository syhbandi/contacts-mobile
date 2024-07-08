import api from "@/axios/api";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { ToastAndroid } from "react-native";

export const useDeleteContact = (id: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const deleteContact = async () => {
    const response = await api.delete(`/contacts/${id}`, {
      headers: { Authorization: user.token },
    });
    return response.data;
  };

  return useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      ToastAndroid.showWithGravity(
        "Contact deleted",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      router.back();
    },
  });
};
