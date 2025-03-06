"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPatientRecord = createPatientRecord;
var _patient = _interopRequireDefault(require("../model/patient.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function createPatientRecord(req, res) {
  var patient = _patient["default"].build({
    firstname: "Mtende"
  });
  console.log(patient);
  patient.save().then(function () {})["catch"](function () {})["finally"](function () {});
}