const dotenv = require('dotenv'); 
dotenv.config();

const express = require('express');

const fs = require('fs');
const cors = require("cors")

const port = process.env.PORT;


const app = express();

// Solve CORS
app.use(cors({ credentials: true, origin: "https://frontend-info-educ.herokuapp.com" }));

// db connection
require("./config/db.js");

app.get("/", (req, res) => {
  res.send("API funcionando - Construida por Thalles Henrique");
});

const router = require("./routes/Router")

app.use(router)

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
