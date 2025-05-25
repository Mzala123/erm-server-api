"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validPassword = exports.setPassword = exports.generateJWT = exports["default"] = void 0;
var _sequelize = require("sequelize");
var _db = _interopRequireDefault(require("./db.js"));
var _person = _interopRequireDefault(require("./person.js"));
var _crypto = _interopRequireDefault(require("crypto"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _response = require("../services/response.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var User = _db["default"].define("users", {
  userId: {
    type: _sequelize.DataTypes.UUID,
    defaultValue: _sequelize.DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: _sequelize.DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  hash: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  salt: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  personId: {
    type: _sequelize.DataTypes.UUID,
    allowNull: false,
    references: {
      model: _person["default"],
      key: "personId"
    }
  }
});
_person["default"].hasOne(User, {
  foreignKey: "personId",
  onDelete: "CASCADE"
});
User.belongsTo(_person["default"], {
  foreignKey: "personId",
  onDelete: "CASCADE"
});
var setPassword = exports.setPassword = function setPassword(password) {
  var salt = _crypto["default"].randomBytes(16).toString('hex');
  var hash = _crypto["default"].pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('base64');
  return {
    salt: salt,
    hash: hash
  };
};
var validPassword = exports.validPassword = function validPassword(user, password) {
  var hash = _crypto["default"].pbkdf2Sync(password, user.salt, 1000, 64).toString('base64');
  return user.hash === hash;
};
var generateJWT = exports.generateJWT = function generateJWT(user) {
  return _jsonwebtoken["default"].sign({
    userId: user.userid,
    email: user.email
  }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};
var _default = exports["default"] = User;