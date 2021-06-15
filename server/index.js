const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
require('newrelic');

const app = express();
const PORT = 4000;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public')));
// app.use(morgan('dev'));


app.get('/:id', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.get('/api/title/:id', (req, res) => {
  return res.redirect(`http://18.144.174.185/api/title/${req.params.id}`);

});

app.listen(PORT, () => {
  console.log(`Proxy listening at port ${PORT}`);
});
