"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
// console.log("Loaded DB Config:", process.env.DB_HOST, process.env.DB_PORT, process.env.DB_USER, process.env.DATABASE_NAME);
// console.log("inside db file", process.env)

var sequelize = new _sequelize.Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD
  // define:{
  //     freezeTableName
  // }
});
var _default = exports["default"] = sequelize;