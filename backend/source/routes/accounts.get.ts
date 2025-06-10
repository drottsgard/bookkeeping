import { Request, Response } from "express";
import { getAllAccounts } from "../repositories/accountRepository/getAllAccounts";

export function getAccounts(_: Request, res: Response) {
  try {
    const accounts = getAllAccounts();
    res.status(200).json(accounts);
  } catch (exception) {
    console.error("Error fetching accounts", exception);
    res.status(500).send("Internal Server Error");
  }
}
