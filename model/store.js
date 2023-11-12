const db = require("../utils/db");
const { Sequelize, DataTypes } = require("sequelize");
var sequelize = db.sequelize;
//-----------------------------
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestemp: {
    type: DataTypes.TIME,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

function login(username, password) {
  return new Promise((resolve, reject) => {
    db.dbConn.query(
      "SELECT * FROM users WHERE email=? LIMIT 1",
      [username, password],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
}
function info_person(id) {
  return new Promise((resolve, reject) => {
    db.dbConn.query(
      "SELECT * FROM users WHERE id=? LIMIT 1",
      [id],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
}
function check_contains_email(email) {
  return new Promise((resolve, reject) => {
    db.dbConn.query(
      "SELECT COUNT(*) AS count FROM users WHERE email=?",
      [email],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
}
function register(email, password, ip_address) {
  return new Promise((resolve, reject) => {
    db.dbConn.query(
      "INSERT INTO `users`(`email`, `password`,`name`) VALUES (?,?,?)",
      [email, password, ip_address],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
}
function change_password_old(id, hash) {
  return new Promise((resolve, reject) => {
    db.dbConn.query(
      "UPDATE users SET password=? WHERE id=?",
      [hash, id],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
}
module.exports = {
  login,
  register,
  change_password_old,
  check_contains_email,
  info_person,
};
