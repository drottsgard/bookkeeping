import express from "express";
import cors from "cors";

import { createAccount } from "./routes/accounts.post";
import { getAccounts } from "./routes/accounts.get";

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/accounts", createAccount);

app.get("/accounts", getAccounts);

app.listen(port, (error) => {
  if (error) {
    console.error("going down...", error);
    process.exit(1);
  }

  console.log("server running on port", port);
});
