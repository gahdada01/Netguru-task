const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// added changes
require('dotenv').config();
const middlewares = require('./util/middlewares');
const api = require('./api');
const dbConnect = require('./util/db');
const {PORT} = require('./util/config');

const startServer = async () => {
  const app = express();

  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use('/', api);

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);

  await dbConnect();

  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
};

startServer();

