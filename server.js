require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const routes = require('./network/routes');

const port = process.env.PORT || 5050;
const irb = process.env.DB_IRB;

db(irb, process.env.DB_NAME);

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_HOST || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

routes(app);

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Example app listening at http://${process.env.HOST || 'localhost'}:${port}`);
  });
}

module.exports = app;
