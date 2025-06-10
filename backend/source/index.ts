import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, (error) => {
  if (error) {
    console.error("going down...", error);
    process.exit(1);
  }

  console.log("server running on port", port);
});
