import db from "../../db";

interface GetChildAccountsParams {
  parentId: number;
}

export function getChildAccounts({ parentId }: GetChildAccountsParams) {
  const selectStatement = db.prepare(
    `SELECT * FROM accounts WHERE parent_id = ?`,
  );
  const accounts = selectStatement.all(parentId);

  return accounts;
}
