import db from "../../db";
import { createAccountFromDbRow } from "../../domains/account";

export function getFullAccounts() {
  const selectStatement = db.prepare(`
    SELECT id, name, parent_id, balance FROM accounts
  `);

  const rows = selectStatement.all();

  // TODO: Fix `as Record<string, any>`
  return rows.map((row) => createAccountFromDbRow(row as Record<string, any>));
}
