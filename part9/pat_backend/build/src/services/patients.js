"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPatientsSafe = exports.GetPatients = void 0;
const patients_1 = __importDefault(require("../../data/patients"));
function GetPatients() {
    return patients_1.default;
}
exports.GetPatients = GetPatients;
function GetPatientsSafe() {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
}
exports.GetPatientsSafe = GetPatientsSafe;
