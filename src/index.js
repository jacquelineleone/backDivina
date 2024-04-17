require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("../src/database/config");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

const port = process.env.PORT;

async function main() {
  try {
    await dbConnect();
    app.listen(port, () => {
      console.log("Listening on http://localhost:" + port);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
  }
}

main();
