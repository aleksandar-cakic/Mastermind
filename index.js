require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Originm X-Requested-With, Content-Type, Accept');
  next();
});

app.use((req, res, next) => {
  res.send('Welcome to Mastermind');
});

app.listen(port, () => {
  console.log(`Port ${port} is on fire!!`);
});