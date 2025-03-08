"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendJsonResponse = void 0;
var sendJsonResponse = exports.sendJsonResponse = function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
};