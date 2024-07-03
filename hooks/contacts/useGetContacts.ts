import api from "@/axios/api";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const getContacts = async (token: string) => {
  const response = await api.get(`/contacts`, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const useGetContacts = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["contacts"],
    queryFn: () => getContacts(user.token),
  });
};
