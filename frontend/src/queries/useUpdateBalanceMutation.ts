import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBalance } from "../services/bookkeeping-service/updateBalance";
import { accountKeys } from "./accountKeys";

export function useUpdateBalanceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      accountId,
      newBalance,
    }: {
      accountId: number;
      newBalance: number;
    }) => updateBalance(accountId, newBalance),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: accountKeys.all,
      });
    },
    onError: (error) => {
      console.error("Error updating balance:", error);
    },
  });
}
