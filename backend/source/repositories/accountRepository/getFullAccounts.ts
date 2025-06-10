import db from "../../db";

export function getFullAccounts() {
  const selectStatement = db.prepare(`
    SELECT id, name, parent_id, balance FROM accounts
  `);

  const rows = selectStatement.all();

  // TODO: Fix `as Record<string, any>`
  return rows.map((row) => createAccountFromDbRow(row as Record<string, any>));
}

interface Account {
  id: number;
  name: string;
  parentId?: number;
  balance: number;
}

function isAccountId(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function assertAccountId(value: unknown): asserts value is number {
  if (!isAccountId(value)) {
    throw new TypeError("Value must be a positive integer");
  }
}

function isAccountName(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "";
}

function assertAccountName(value: unknown): asserts value is string {
  if (!isAccountName(value)) {
    throw new TypeError("Value must be a non-empty string");
  }
}

function isBalance(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
}

function assertBalance(value: unknown): asserts value is number {
  if (!isBalance(value)) {
    throw new TypeError("Value must be a finite number");
  }
}

function createAccountFromDbRow(row: Record<string, any>): Account {
  assertAccountId(row.id);
  assertAccountName(row.name);
  assertBalance(row.balance);

  if (row.parent_id) {
    assertAccountId(row.parent_id);
  }

  return {
    id: row.id,
    name: row.name,
    parentId: row.parent_id,
    balance: row.balance,
  };
}
