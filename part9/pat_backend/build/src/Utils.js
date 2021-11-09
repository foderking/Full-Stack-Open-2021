"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToPatientEntry = void 0;
const types_1 = require("./types");
const uuid_1 = require("uuid");
function ToPatientEntry({ name, dateOfBirth, ssn, gender, occupation }) {
    const newentry = {
        id: ParseId((0, uuid_1.v1)()),
        name: ParseName(name),
        dateOfBirth: ParseDOB(dateOfBirth),
        ssn: ParseSSN(ssn),
        gender: ParseGender(gender),
        occupation: ParseOccu(occupation),
        entries: []
    };
    return newentry;
}
exports.ToPatientEntry = ToPatientEntry;
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
function ParseId(id) {
    if (!id || !isString(id)) {
        throw new Error('Incorrect or missing comment');
    }
    return id;
}
function ParseName(name) {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing comment');
    }
    return name;
}
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
function ParseDOB(dob) {
    if (!dob || !isString(dob) || !isDate(dob)) {
        throw new Error('Incorrect or missing comment');
    }
    return dob;
}
function ParseSSN(ssn) {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing comment');
    }
    return ssn;
}
const isGender = (str) => {
    return Object.values(types_1.Gender).includes(str);
};
function ParseGender(gender) {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing comment');
    }
    return gender;
}
function ParseOccu(occupation) {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing comment');
    }
    return occupation;
}
