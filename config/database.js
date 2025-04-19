// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false  // Disable SQL logs
});

module.exports = sequelize;