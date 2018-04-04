const Sequelize = require("sequelize");
const db = require("../db");

const todos = db.define("todos", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  message: Sequelize.STRING,
  completion: Sequelize.BOOLEAN,
  createdAt: Sequelize.DATE,
  updateddAt: Sequelize.DATE
});

module.exports = todos ;