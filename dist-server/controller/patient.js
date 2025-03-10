"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePatientRecord = exports.readOnePatientRecord = exports.patientsRecords = exports.deletePatientRecord = exports.createPatientRecord = void 0;
var _sequelize = require("sequelize");
var _patient = _interopRequireDefault(require("../model/patient.js"));
var _response = require("../services/response.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var createPatientRecord = exports.createPatientRecord = function createPatientRecord(req, res) {
  var _req$body = req.body,
    firstname = _req$body.firstname,
    lastname = _req$body.lastname,
    gender = _req$body.gender,
    birthdate = _req$body.birthdate,
    current_address = _req$body.current_address,
    occupation = _req$body.occupation;
  if (!firstname || !lastname) {
    (0, _response.sendJsonResponse)(res, 400, {
      "message": "Please fill in all requireds fields"
    });
  }
  _patient["default"].create({
    firstname: firstname,
    lastname: lastname,
    gender: gender,
    birthdate: birthdate,
    current_address: current_address,
    occupation: occupation
  }).then(function () {
    (0, _response.sendJsonResponse)(res, 201, {
      "message": "Patient record created successfully!"
    });
  })["catch"](function (err) {
    (0, _response.sendJsonResponse)(res, 500, {
      "message": "Failed to create patient record! " + err
    });
  });
};
var patientsRecords = exports.patientsRecords = function patientsRecords(req, res) {
  _patient["default"].findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    order: [['firstname', 'ASC']]
  }).then(function (patient) {
    (0, _response.sendJsonResponse)(res, 200, patient);
  })["catch"](function (err) {
    (0, _response.sendJsonResponse)(res, 500, err);
  });
};
var readOnePatientRecord = exports.readOnePatientRecord = function readOnePatientRecord(req, res) {
  var patientId = req.params.patientId;
  _patient["default"].findByPk(patientId, {
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    }
  }).then(function (patient) {
    (0, _response.sendJsonResponse)(res, 200, patient);
  })["catch"](function (err) {
    (0, _response.sendJsonResponse)(res, 500, {
      "message": "Error finding patient record " + err
    });
  });
};
var updatePatientRecord = exports.updatePatientRecord = function updatePatientRecord(req, res) {
  var patientId = req.params.patientId;
  var _req$body2 = req.body,
    firstname = _req$body2.firstname,
    lastname = _req$body2.lastname,
    gender = _req$body2.gender,
    birthdate = _req$body2.birthdate,
    current_address = _req$body2.current_address,
    occupation = _req$body2.occupation;
  if (!firstname || !lastname) {
    (0, _response.sendJsonResponse)(res, 500, {
      "message": "Please fill in all requireds fields"
    });
  }
  _patient["default"].update({
    firstname: firstname,
    lastname: lastname,
    gender: gender,
    birthdate: birthdate,
    current_address: current_address,
    occupation: occupation
  }, {
    where: {
      patientId: patientId
    }
  }).then(function () {
    (0, _response.sendJsonResponse)(res, 200, {
      "message": "Patient record updated successfully"
    });
  })["catch"](function (err) {
    (0, _response.sendJsonResponse)(res, 500, {
      "message": "Failed to updated patients record ",
      err: err
    });
  });
};
var deletePatientRecord = exports.deletePatientRecord = function deletePatientRecord(req, res) {
  var patientId = req.params.patientId;
  _patient["default"].destroy({
    where: {
      patientId: patientId
    }
  }).then(function () {
    (0, _response.sendJsonResponse)(res, 200, {
      "message": "Patient record removed successfully"
    });
  })["catch"](function (err) {
    (0, _response.sendJsonResponse)(res, 500, {
      "message": "Failed to remove patient record ",
      err: err
    });
  });
};