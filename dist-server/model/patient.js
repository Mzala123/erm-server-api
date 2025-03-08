"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _db = _interopRequireDefault(require("./db.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Patient = _db["default"].define("Patient", {
  patientId: {
    type: _sequelize.DataTypes.UUID,
    defaultValue: _sequelize.DataTypes.UUIDV4,
    primaryKey: true
  },
  firstname: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: _sequelize.DataTypes.ENUM,
    values: ["Male", "Female"],
    allowNull: false
  },
  birthdate: {
    type: _sequelize.DataTypes.DATEONLY
  },
  current_addresss: _sequelize.DataTypes.TEXT,
  occupation: _sequelize.DataTypes.STRING
}, {
  getterMethods: {
    getFullname: function getFullname() {
      return [this.firstname, this.lastname].join(' ');
    }
  }
});
var _default = exports["default"] = Patient;