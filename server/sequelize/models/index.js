const { Sequelize } = require("sequelize");
const config = require('../config/config');


const sequelize = new Sequelize(
    'authorization',
    'postgres',
    '123',
    config
);

module.exports ={sq:sequelize, types: require('sequelize').DataTypes};