import { Request, Response } from "express";
import { getFullAccounts } from "../repositories/accountRepository/getFullAccounts";

export function getAccounts(_: Request, res: Response) {
  try {
    const accounts = getFullAccounts();
    res.status(200).json(accounts);
  } catch (exception) {
    console.error("Error fetching accounts", exception);
    res.status(500).send("Internal Server Error");
  }
}
