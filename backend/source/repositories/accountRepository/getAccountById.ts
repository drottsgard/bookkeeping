import db from "../../db";

export function getAccountById(accountId: number) {
  const selectStatement = db.prepare(`
    SELECT id, name, parent_id AS "parentId", balance
    FROM accounts
    WHERE id = ?
  `);

  const account = selectStatement.get(accountId);

  return account;
}
