const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const user = require("./user"); //new addition
const InitiateMongoServer = require("./db");

InitiateMongoServer();

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.listen(4000, function () {
  console.log("app listening on port 3000!");
});

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});


app.use("/user", user);

app.listen(3000, (req, res) => {
  console.log(`Server Started at 3000 ${3000}`);
});
