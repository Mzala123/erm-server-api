"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = require("sequelize");
var _db = _interopRequireDefault(require("./db.js"));
var _person = _interopRequireDefault(require("./person.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Patient = _db["default"].define("patients", {
  patientId: {
    type: _sequelize.DataTypes.UUID,
    defaultValue: _sequelize.DataTypes.UUIDV4,
    primaryKey: true
  },
  personId: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    references: {
      model: _person["default"],
      key: "personId"
    }
  }
}, {
  paranoid: true
});
_person["default"].hasOne(Patient, {
  foreignKey: "personId",
  onDelete: "CASCADE"
});
Patient.belongsTo(_person["default"], {
  foreignKey: "personId",
  onDelete: "CASCADE"
});
var _default = exports["default"] = Patient;