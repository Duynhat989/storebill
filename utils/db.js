require('dotenv').config();
// const mysql = require('mysql');
// var dbConn = mysql.createConnection({
//     host: process.env.HOST_DATABASE,
//     user: process.env.USER_DATABASE,
//     password: process.env.PASS_DATABASE,
//     database: process.env.NAME_DATABASE
// });
// dbConn.connect()
// module.exports = {
//     dbConn
// }
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.NAME_DATABASE,  process.env.USER_DATABASE, process.env.PASS_DATABASE, {
  host: process.env.HOST_DATABASE,
  dialect: 'mysql', // Loại cơ sở dữ liệu bạn đang sử dụng (postgres, mysql, sqlite, ...)
});
module.exports = {
    sequelize
}