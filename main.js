const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const { selectAllMessage, addMessage } = require("./massage");
app.get("/message", async (req, res) => {
  const list = await selectAllMessage();
  res.json(list);
});

app.post("/add-msg", async (req, res) => {
  const msg = req.body;
  await addMessage(msg);
  res.json("Message Added");
});

app.listen(4000, () => {
  console.log("Server Start");
});
