import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAccount } from "../services/bookkeeping-service/addAccount";
import { accountKeys } from "./accountKeys";

export function useAddAccountMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      accountName,
      parentId,
    }: {
      accountName: string;
      parentId?: number;
    }) => addAccount(accountName, parentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: accountKeys.all,
      });
    },
    onError: (error) => {
      console.error("Error adding account:", error);
    },
  });
}
