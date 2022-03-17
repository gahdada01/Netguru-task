const mongoose = require('mongoose');
const {DATABASE_URL} = require('./config');

const dbConnect = async () => {
  // DB connection
  await mongoose.connect(DATABASE_URL);
};

module.exports = dbConnect;
