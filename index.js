const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("App Live version 2 🚀");
});

app.listen(process.env.PORT || 3000);
