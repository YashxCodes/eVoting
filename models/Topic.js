// models/Topic.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Topic = sequelize.define('Topic', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Options is stored as JSON. Example: [ { option: "A", count: 0 }, { option: "B", count: 0 } ]
  options: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [] 
  }
});

module.exports = Topic;