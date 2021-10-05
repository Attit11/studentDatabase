require("./db/mongoose");
const express = require("express");

const studentRouter = require("./Router/student");

const app = express();
app.use(express.json());
app.use(studentRouter);

app.listen(3000, () => {
  console.log("Hello from the server");
  console.log("The server is up at port 3000");
});
