const express = require('express');

const postRouter = require('./data/router.js')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
  
  `);
});

server.use('/api/posts', postRouter);

module.exports = server;