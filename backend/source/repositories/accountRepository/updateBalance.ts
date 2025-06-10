import db from "../../db";

export function updateBalance({
  accountId,
  delta,
}: {
  accountId: number;
  delta: number;
}) {
  const updateStatement = db.prepare(
    "UPDATE accounts SET balance = balance + ? WHERE id = ?"
  );

  const result = updateStatement.run(delta, accountId);
  if (result.changes === 0) {
    throw new Error("Account not found or balance update failed.");
  }

  return result.changes;
}
