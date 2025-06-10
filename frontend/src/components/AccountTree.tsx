import { useState } from "react";

import "./AccountTree.css";

import { useAddAccountMutation } from "../queries/useAddAccountMutation";
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
  const [isExpanded, setIsExpanded] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [newAccountName, setNewAccountName] = useState("");
  const addAccountMutation = useAddAccountMutation();

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addAccountMutation.mutate({
      accountName: newAccountName,
      parentId: props.accountNode.id,
    });
    setNewAccountName("");
    setShowForm(false);
  };

  return (
    <div>
      Name: {props.accountNode.name}
      Balance: {props.accountNode.balance}
      <button onClick={() => setShowForm(!showForm)}>+</button>
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="new-account-name">New account name:</label>
          <input
            id="new-account-name"
            type="text"
            value={newAccountName}
            onChange={(e) => setNewAccountName(e.target.value)}
          />
          <label htmlFor="new-balance">New balance:</label>
          <button type="submit">Add Account</button>
        </form>
      )}
      {props.accountNode.children.length > 0 && (
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      )}
      {isExpanded &&
        props.accountNode.children.map((node) => (
          <RecursiveAccountAccordion key={node.id} accountNode={node} />
        ))}
    </div>
  );
}
