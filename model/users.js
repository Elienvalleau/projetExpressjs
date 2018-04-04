const Sequelize = require("sequelize");
const db = require("../db");

const users = db.define("users", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  nom: Sequelize.STRING,
  password: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updateddAt: Sequelize.DATE
});

module.exports = users ;