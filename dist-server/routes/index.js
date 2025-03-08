"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _patient = require("../controller/patient.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

// patient apis

router.post('/patients', _patient.createPatientRecord);
router.get('/patients/:patientId', _patient.readOnePatientRecord);
router.get('/patients', _patient.patientsRecords);
router.put('/patients/:patientId', _patient.updatePatientRecord);
router["delete"]('/patients/:patientId', _patient.deletePatientRecord);
var _default = exports["default"] = router;