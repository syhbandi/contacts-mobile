import api from "@/axios/api";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const getContact = async (id: string, token: string) => {
  const { data } = await api.get(`/contacts/${id}`, {
    headers: { Authorization: token },
  });
  return data;
};

const useGetContactById = (id: string) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["contacts", id],
    queryFn: () => getContact(id, user.token),
    select: ({ data }) => ({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
    }),
  });
};

export default useGetContactById;
