import { describe, test, expect, vi, beforeEach } from "vitest";

import { updateBalanceRecursive } from "./updateBalanceRecursive";

const mockGet = vi.fn();
const mockPrepare = vi.fn(() => ({ get: mockGet }));

vi.mock("../../source/db", () => ({
  default: { prepare: mockPrepare },
}));

const mockUpdateBalance = vi.fn();

vi.mock("../../source/lib/updateBalance", () => ({
  updateBalance: mockUpdateBalance,
}));

vi.mock("../../source/domains/account", () => ({
  createAccountFromDbRow: (row: any) => ({
    id: 999,
    parentId: row.parent_id,
    balance: 0,
    name: "Mock Account",
  }),
}));

beforeEach(() => {
  mockGet.mockReset();
  mockPrepare.mockClear();
  mockUpdateBalance.mockReset();
});

describe.skip("updateBalanceRecursive", () => {
  test("cascades updates up two levels", () => {
    // Simulate: acc3 → acc2 → acc1 → null
    mockGet
      .mockReturnValueOnce({ parent_id: 2 })
      .mockReturnValueOnce({ parent_id: 1 })
      .mockReturnValueOnce({ parent_id: null });

    updateBalanceRecursive({ accountId: 3, delta: 50 });

    expect(mockUpdateBalance).toHaveBeenCalledTimes(2);
    expect(mockUpdateBalance).toHaveBeenNthCalledWith(1, {
      accountId: 2,
      delta: 50,
    });
    expect(mockUpdateBalance).toHaveBeenNthCalledWith(2, {
      accountId: 1,
      delta: 50,
    });
  });

  test("does not call updateBalance if account has no parent", () => {
    mockGet.mockReturnValueOnce({ parent_id: null });

    updateBalanceRecursive({ accountId: 1, delta: 100 });

    expect(mockUpdateBalance).not.toHaveBeenCalled();
  });

  test("handles a single parent step", () => {
    mockGet
      .mockReturnValueOnce({ parent_id: 5 })
      .mockReturnValueOnce({ parent_id: null });

    updateBalanceRecursive({ accountId: 6, delta: 10 });

    expect(mockUpdateBalance).toHaveBeenCalledTimes(1);
    expect(mockUpdateBalance).toHaveBeenCalledWith({ accountId: 5, delta: 10 });
  });
});
