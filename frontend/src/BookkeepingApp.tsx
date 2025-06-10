import { useQuery } from "@tanstack/react-query";
import "./BookkeepingApp.css";

import { useAccountQueries } from "./queries/useAccountQueries";
import { AccountTree } from "./components/AccountTree";

function BookkeepingApp() {
  const { allAccountsQuery } = useAccountQueries();

  const allAccountsQueryResult = useQuery(allAccountsQuery());

  if (allAccountsQueryResult.isError) {
    return (
      <div>Error loading accounts: {allAccountsQueryResult.error.message}</div>
    );
  }

  if (allAccountsQueryResult.isLoading) {
    return <div>Loading accounts...</div>;
  }

  if (!allAccountsQueryResult.data) {
    return <div>No accounts found</div>;
  }

  return (
    <>
      <AccountTree accounts={allAccountsQueryResult.data} />
    </>
  );
}

export default BookkeepingApp;
