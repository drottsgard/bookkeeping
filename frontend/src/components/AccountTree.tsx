import { useState } from "react";

import "./AccountTree.css";

import { useAddAccountMutation } from "../queries/useAddAccountMutation";
import { useUpdateBalanceMutation } from "../queries/useUpdateBalanceMutation";
import type { AccountTreeNode } from "../domains/account";
import { Collapse, Input, InputNumber, Space } from "antd";

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
  const [newAccountName, setNewAccountName] = useState("");
  const [newBalance, setNewBalance] = useState(0);

  const addAccountMutation = useAddAccountMutation();
  const updateBalanceMutation = useUpdateBalanceMutation();

  const handleSubmitAddChildForm = (event: React.FormEvent) => {
    event.preventDefault();
    addAccountMutation.mutate({
      accountName: newAccountName,
      parentId: props.accountNode.id,
    });
    setNewAccountName("");
  };

  const handleUpdateBalance = (event: React.FormEvent) => {
    event.preventDefault();

    if (updateBalanceMutation.isPending) {
      return;
    }

    updateBalanceMutation.mutate({
      accountId: props.accountNode.id,
      newBalance: newBalance,
    });

    setNewBalance(0);
  };

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
                <form
                  onSubmit={handleUpdateBalance}
                  className="update-balance-form"
                >
                  <InputNumber
                    style={{ width: 200 }}
                    value={newBalance}
                    suffix="SEK"
                    onChange={(value) => setNewBalance(value ?? 0)}
                  />
                  <button
                    type="submit"
                    disabled={updateBalanceMutation.isPending}
                  >
                    Update balance
                  </button>
                </form>
              )}
              <form onSubmit={handleSubmitAddChildForm}>
                <div className="account-name-container">
                  <label htmlFor="account-name-input">Add child</label>
                  <Space.Compact>
                    <Input
                      id="account-name-input"
                      type="text"
                      value={newAccountName}
                      onChange={(e) => setNewAccountName(e.target.value)}
                    />
                    <button type="submit" aria-label="Add child account">
                      +
                    </button>
                  </Space.Compact>
                </div>
              </form>
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
