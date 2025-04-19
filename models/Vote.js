// models/Vote.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Topic = require("./Topic");

const Vote = sequelize.define('Vote', {
  votedOption: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Associations: A vote belongs to a voter and a topic.
Vote.belongsTo(User, { foreignKey: 'userId', as: 'voter' });
Vote.belongsTo(Topic, { foreignKey: 'topicId', as: 'topic' });

module.exports = Vote;