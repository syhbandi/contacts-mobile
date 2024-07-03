import api from "@/axios/api";
import { useAuth } from "@/context/AuthContext";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchPaginatedData = async (
  token: string,
  pageParam: any,
  search?: string
) => {
  let url = `/contacts?page=${pageParam}`;

  if (search) {
    url += `&query=${search}`;
  }

  const response = await api.get(url, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const usePaginatedData = (search?: string) => {
  const { user } = useAuth();

  return useInfiniteQuery({
    queryKey: ["contacts", search],
    queryFn: ({ pageParam }) =>
      fetchPaginatedData(user.token, pageParam, search),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.links.next ? lastPage.meta.current_page + 1 : undefined,
  });
};

export default usePaginatedData;
