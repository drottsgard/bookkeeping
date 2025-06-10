export interface Account {
  id: number;
  name: string;
  parentId?: number;
  balance: number;
}

function isAccountId(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

export function assertAccountId(value: unknown): asserts value is number {
  if (!isAccountId(value)) {
    throw new TypeError("Account id must be a positive integer");
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

export function assertBalance(value: unknown): asserts value is number {
  if (!isBalance(value)) {
    throw new TypeError("Value must be a finite number");
  }
}

export function createAccountFromDbRow(row: Record<string, any>): Account {
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
