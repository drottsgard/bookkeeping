import "./AccountTree.css";
import { Collapse } from "antd";

import type { AccountTreeNode } from "../domains/account";
import { BalanceForm } from "./BalanceForm";
import { AccountForm } from "./AccountForm";

interface AccountTreeProps {
  accounts: AccountTreeNode[];
}

interface AccountAccordionProps {
  accountNode: AccountTreeNode;
}

export function AccountTree(props: AccountTreeProps) {
  return (
    <div className="account-tree-container">
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
    <Collapse
      items={[
        {
          key: props.accountNode.id,
          label: (
            <div>
              <h4>{props.accountNode.name}</h4>
              <span>{props.accountNode.balance} SEK</span>
            </div>
          ),
          children: (
            <div className="collapse-container">
              {props.accountNode.children.length === 0 && (
                <BalanceForm account={props.accountNode} />
              )}
              <AccountForm account={props.accountNode} />
              {props.accountNode.children.map((child) => (
                <RecursiveAccountAccordion key={child.id} accountNode={child} />
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}
