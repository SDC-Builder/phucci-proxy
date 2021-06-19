const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
require('newrelic');
const fs = require('fs');
let htmlTemplate = require('./html-template/htmlGenerator');
const { promisify } = require("util");


const redis = require('redis');

const app = express();
const PORT = 4000;

const client = redis.createClient({
  host: '54.183.224.9',
  port: 6379
});

const getCache = promisify(client.get).bind(client);
const setCache = promisify(client.set).bind(client);

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TitleService from './../phucci-titleBanner-service/client/src/template.jsx';
import ReactDom from 'react-dom';


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public')));
// app.use(morgan('dev'));

let renderedHtml;

const getTitle = async (id) => {
  try {
    let res = await axios.get(`http://13.57.36.223/api/title/${id}`);
    const Title = ReactDOMServer.renderToString(<TitleService title={res.data.tittle} />);

    renderedHtml = htmlTemplate.replace('<div id="title"></div>', `<div id="title">${Title}</div>`);
    return renderedHtml = renderedHtml.replace('<div id="enrollmennt">0</div>', `<div id="enrollmennt">${res.data.enrollments}</div>`);
  }
  catch(e) { return console.log('ERROR FETCHING TITLE = ', e); }
}

app.get('/:id', async (req, res) => {
  const cachedData = await getCache(req.params.id);
  if (cachedData) { return res.send(cachedData); }

  await getTitle(req.params.id);

  const cachedResult = await setCache(req.params.id, renderedHtml, 'EX', 5);
  res.send(renderedHtml);
});


app.listen(PORT, () => {
  console.log(`Proxy listening at port ${PORT}`);
});

