export interface Account {
  id: number;
  name: string;
  balance: number;
  parentId?: number | null;
}

export interface AccountTreeNode extends Account {
  children: AccountTreeNode[];
}
