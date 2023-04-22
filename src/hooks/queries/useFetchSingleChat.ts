import { axios } from "@/lib/axios";
import { useUserStore } from "@/store/useUserStore";
import { IChat } from "@/types/chat.types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

async function fetchSingleChat(
  chatId?: string,
  token?: string
): Promise<IChat> {
  const { data } = await axios.get(`/chat/get/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
function useFetchSingleChat(chatId?: string) {
  const { userInfo } = useUserStore((state) => state);
  return useQuery(
    [chatId],
    () => fetchSingleChat(chatId, userInfo?.jwt_token),
    {
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
    }
  );
}
export { useFetchSingleChat };
