import type { AccountTreeNode } from "../../components/AccountAccordion";

export async function fetchAccounts(): Promise<AccountTreeNode[]> {
  const res = await fetch("http://localhost:3000/accounts");
  return res.json();
}
