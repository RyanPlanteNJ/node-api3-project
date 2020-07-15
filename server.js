const express = require('express');
const postsRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');
const middleware = require('./middleware.js');



const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

server.use(express.json());
server.use(helmet());
// server.use(morgan('dev'));
server.use(middleware.logger);
server.use('/api/posts/', postsRouter);
server.use('/api/users/', userRouter);




server.get('/', (req, res, next) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
  next();
});

module.exports = server;
