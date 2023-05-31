const { Sequelize } = require("sequelize");
const config = require('../config/config.json').development;


const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

module.exports ={sq:sequelize, types: require('sequelize').DataTypes};