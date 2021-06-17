const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
require('newrelic');
const fs = require('fs');

const app = express();
const PORT = 4000;

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TitleService from './../phucci-titleBanner-service/client/src/template.jsx';

console.log('TitleService = ', TitleService);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public')));
// app.use(morgan('dev'));

const Title = ReactDOMServer.renderToString(<TitleService />);
const indexHtmlDir = path.resolve('./public/index.html');
let renderedHtml;

fs.readFile(indexHtmlDir, 'utf8', (err, data) => {
  if (err) { return console.log('ERROR READING HTML = ', err); }
  renderedHtml = data.replace('<div id="title"></div>', `<div id="title">${Title}</div>`);
});

app.get('/', (req, res) => {
  return res.send(renderedHtml);
});

app.get('/:id', async (req, res) => {
  return res.send(renderedHtml);
});


app.listen(PORT, () => {
  console.log(`Proxy listening at port ${PORT}`);
});
