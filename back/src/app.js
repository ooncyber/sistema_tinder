const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const db = require('./db/schema');
db.criarTabelas();

app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(routes);


module.exports= app;