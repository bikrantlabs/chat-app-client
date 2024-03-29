import { axios } from "@/lib/axios";
import { IChat } from "@/types/chat.types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

async function fetchChats(token?: string): Promise<IChat[]> {
  const { data } = await axios.get(`/chat/get-all-chats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
function useFetchChats(token?: string) {
  return useQuery(["chats"], () => fetchChats(token), {
    onError(error: AxiosError) {
      if (error.message === "Network Error") {
        toast.error("Network Error");
      }
      if (error.response?.data) {
        Object.values(error.response.data).map((item) =>
          toast.error(JSON.stringify(item))
        );
      }
    },
  });
}
export { useFetchChats };
