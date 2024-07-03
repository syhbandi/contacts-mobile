import api from "@/axios/api";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const getUser = async (token: string) => {
  const response = await api.get("/users/current", {
    headers: { Authorization: token },
  });
  console.log(response.data);
  return response.data;
};

const useGetCurrentUser = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUser(user.token),
    select: ({ data }) => ({
      id: data.id,
      name: data.name,
      username: data.username,
      token: data.token,
    }),
  });
};

export default useGetCurrentUser;
