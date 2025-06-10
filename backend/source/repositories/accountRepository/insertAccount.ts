import db from "../../db";

interface InsertAccountParams {
  name: string;
  parentId?: number;
}

export function insertAccount({ name, parentId }: InsertAccountParams) {
  const insertStatement = db.prepare(`
    INSERT INTO accounts (name, parent_id, balance) VALUES (?, ?, 0)
  `);

  const info = insertStatement.run(name, parentId);
  return info.lastInsertRowid;
}
