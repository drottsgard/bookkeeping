import { Request, Response } from "express";
import { insertAccount } from "../repositories/accountRepository/insertAccount";
import { getAccountById } from "../repositories/accountRepository/getAccountById";

export function createAccount(req: Request, res: Response) {
  const postAccountBody = createPostAccountsBody(req);

  if (postAccountBody.parentId) {
    const parentAccount = getAccountById(postAccountBody.parentId);

    if (!parentAccount) {
      throw new Error(
        `Parent account with ID ${postAccountBody.parentId} not found`,
      );
    }
  }

  try {
    insertAccount(postAccountBody);
    res.statusCode = 201;
    res.send({ message: "Account created successfully" });
  } catch (exception) {
    console.error("Error inserting account", exception);
    res.statusCode = 500;
    res.send({ error: "Failed to create account" });
  }
}

function assertNonEmptyString(value: string): asserts value is string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error("Value must be a non-empty string");
  }
}

interface PostAccountBody {
  name: string;
  parentId?: number;
}

function createPostAccountsBody(request: Request): PostAccountBody {
  const { name, parentId } = request.body;
  assertNonEmptyString(name);

  if (parentId !== undefined && typeof parentId !== "number") {
    throw new Error("parentId must be a number or undefined");
  }

  return {
    name,
    parentId,
  };
}
