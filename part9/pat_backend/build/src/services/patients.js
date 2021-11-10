"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEntry = exports.CreateDiaryEntry = exports.GetPatientsPublic = exports.GetPatientsSafe = exports.GetByID = exports.GetPatients = void 0;
const patients_1 = __importDefault(require("../../data/patients"));
function GetPatients() {
    return patients_1.default;
}
exports.GetPatients = GetPatients;
function GetByID(id) {
    return patients_1.default.find(each => each.id === id);
}
exports.GetByID = GetByID;
function GetPatientsSafe() {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({ id, name, dateOfBirth, gender, occupation, entries }));
}
exports.GetPatientsSafe = GetPatientsSafe;
function GetPatientsPublic() {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
}
exports.GetPatientsPublic = GetPatientsPublic;
function CreateDiaryEntry({ id, name, dateOfBirth, ssn, gender, occupation, entries }) {
    const new_entry = {
        id,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        entries,
    };
    patients_1.default.push(new_entry);
    return new_entry;
}
exports.CreateDiaryEntry = CreateDiaryEntry;
const addEntry = (patientId, entry) => {
    const patient = GetByID(patientId);
    if (!patient) {
        throw new Error(`Incorrect patient id`);
    }
    patient.entries.push(entry);
    return entry;
};
exports.addEntry = addEntry;
