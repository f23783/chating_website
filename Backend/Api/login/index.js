require('dotenv').config();
const express = require("express");

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => console.log(`Its alive on http://localhost:${process.env.PORT}`));

app.post("/login", (req, res) => {


})
