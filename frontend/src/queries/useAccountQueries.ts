import { queryOptions } from "@tanstack/react-query";

import { fetchAccounts } from "../services/bookkeeping-service/fetchAccounts";
import { accountKeys } from "./accountKeys";

export function useAccountQueries() {
  const allAccountsQuery = () => {
    return queryOptions({
      queryKey: accountKeys.all,
      queryFn: () => {
        return fetchAccounts();
      },
    });
  };

  return { allAccountsQuery };
}
