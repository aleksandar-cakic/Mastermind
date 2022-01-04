require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/api');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log('We are Mongoosing!'))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Originm X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('client/dist'))
app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
})

app.listen(port, () => {
  console.log(`Port ${port} is on fire!!`);
});