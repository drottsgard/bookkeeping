import { Request, Response } from "express";

import { getChildAccounts } from "../repositories/accountRepository/getChildAccounts";
import { updateBalance } from "../repositories/accountRepository/updateBalance";
import { updateBalanceRecursive } from "../repositories/accountRepository/updateBalanceRecursive";
import {
  assertAccountId,
  assertBalance,
  createAccountFromDbRow,
} from "../domains/account";

export function patchBalance(req: Request, res: Response) {
  const { id } = req.params;
  const { delta } = req.body;

  const accountId = Number(id);

  assertAccountId(accountId);
  assertBalance(delta);

  const children = getChildAccounts({ parentId: accountId }).map((child) =>
    // TODO: Fix record<string, any>
    createAccountFromDbRow(child as Record<string, any>),
  );

  if (children.length > 0) {
    res.statusCode = 400;
    res.send({
      message: "Cannot update balance of an account with child accounts.",
    });
    return;
  }

  updateBalance({ accountId, delta });
  updateBalanceRecursive({ accountId, delta });

  res.statusCode = 200;
  res.send({ message: "Balance updated successfully." });
}
