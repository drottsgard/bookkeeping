import { Input, Space } from "antd";
import { useAddAccountMutation } from "../queries/useAddAccountMutation";
import { useState } from "react";

interface AccountFormProps {
  label: string;
  accountId?: number;
}

export function AccountForm(props: AccountFormProps) {
  const [newAccountName, setNewAccountName] = useState("");

  const addAccountMutation = useAddAccountMutation();

  const handleSubmitAddChildForm = (event: React.FormEvent) => {
    event.preventDefault();
    addAccountMutation.mutate({
      accountName: newAccountName,
      parentId: props.accountId,
    });
    setNewAccountName("");
  };

  return (
    <form onSubmit={handleSubmitAddChildForm}>
      <div className="account-name-container">
        <label htmlFor="account-name-input">{props.label}</label>
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
  );
}
