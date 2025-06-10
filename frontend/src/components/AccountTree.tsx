import "./AccountTree.css";

import type { AccountTreeNode } from "../domains/account";

interface AccountTreeProps {
  accounts: AccountTreeNode[];
}

interface AccountAccordionProps {
  accountNode: AccountTreeNode;
}

export function AccountTree(props: AccountTreeProps) {
  return (
    <div>
      {props.accounts.map((root) => (
        <div className="root-node-container">
          <RecursiveAccountAccordion accountNode={root} />
        </div>
      ))}
    </div>
  );
}

export function RecursiveAccountAccordion(props: AccountAccordionProps) {
  return (
    <div>
      Name: {props.accountNode.name}
      Balance: {props.accountNode.balance}
    </div>
  );
}
