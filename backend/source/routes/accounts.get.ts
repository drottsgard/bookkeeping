import { Request, Response } from "express";
import { getAllAccounts } from "../repositories/accountRepository/getAllAccounts";
import { Account } from "../domains/account";

export function getAccounts(_: Request, res: Response) {
  try {
    const accounts = getAllAccounts();
    const tree = buildTreeRecursive(accounts);
    res.status(200).json(tree);
  } catch (exception) {
    console.error("Error fetching accounts", exception);
    res.status(500).send("Internal Server Error");
  }
}

// TODO: Move
interface AccountTreeNode extends Account {
  children: AccountTreeNode[];
}

function buildTreeRecursive(
  accounts: Account[],
  parentId: number | null = null,
): AccountTreeNode[] {
  return accounts
    .filter((acc) => acc.parentId === parentId)
    .map((acc) => ({
      ...acc,
      children: buildTreeRecursive(accounts, acc.id),
    }));
}
