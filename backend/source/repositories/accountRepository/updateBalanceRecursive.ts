import db from "../../db";
import { createAccountFromDbRow } from "../../domains/account";
import { updateBalance } from "./updateBalance";

export function updateBalanceRecursive({
  accountId,
  delta,
}: {
  accountId: number;
  delta: number;
}) {
  const selectParentStatement = db.prepare(
    `SELECT * FROM accounts WHERE id = ?`,
  );

  const parent = selectParentStatement.get(accountId) as {
    parent_id: number | null;
  };

  if (parent.parent_id == null) {
    return;
  }

  // TODO: Fix record<string, any>
  const parentAccont = createAccountFromDbRow(parent as Record<string, any>);

  if (parentAccont.parentId != null) {
    updateBalance({ accountId: parentAccont.parentId, delta });

    updateBalanceRecursive({ accountId: parentAccont.parentId, delta });
  }
}
