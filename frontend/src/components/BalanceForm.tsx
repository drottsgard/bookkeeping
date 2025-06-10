import { useState } from "react";
import { InputNumber } from "antd";

import type { AccountTreeNode } from "../domains/account";
import { useUpdateBalanceMutation } from "../queries/useUpdateBalanceMutation";

interface BalanceFormProps {
  account: AccountTreeNode;
}

export function BalanceForm(props: BalanceFormProps) {
  const [newBalance, setNewBalance] = useState(0);

  const updateBalanceMutation = useUpdateBalanceMutation();

  const handleUpdateBalance = (event: React.FormEvent) => {
    event.preventDefault();

    if (updateBalanceMutation.isPending) {
      return;
    }

    updateBalanceMutation.mutate({
      accountId: props.account.id,
      newBalance: newBalance,
    });

    setNewBalance(0);
  };

  return (
    <form onSubmit={handleUpdateBalance} className="update-balance-form">
      <InputNumber
        style={{ width: 200 }}
        value={newBalance}
        suffix="SEK"
        onChange={(value) => setNewBalance(value ?? 0)}
      />
      <button type="submit" disabled={updateBalanceMutation.isPending}>
        Update balance
      </button>
    </form>
  );
}
