const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
  operatorsAliases: {
    $eq: Op.eq,
    $like: Op.like
  }
});
module.exports = db;
