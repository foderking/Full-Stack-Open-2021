"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToNewEntry = exports.ToPatientEntry = void 0;
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
const ToNewEntry = (object) => {
    const baseEntry = {
        id: (0, uuid_1.v1)(),
        description: parseString('description', object.description),
        date: ParseDOB(object.date),
        specialist: parseString('specialist', object.specialist),
        diagnosisCodes: parseArrayStringCodes(object.diagnosisCodes),
    };
    if (!object.type || !isString(object.type)) {
        throw new Error(`Missing or invalid entry type`);
    }
    switch (object.type) {
        case 'HealthCheck':
            return Object.assign(Object.assign({}, baseEntry), { type: 'HealthCheck', healthCheckRating: parseRating(object.healthCheckRating) });
        case 'Hospital':
            return Object.assign(Object.assign({}, baseEntry), { type: 'Hospital', discharge: {
                    date: ParseDOB(object.dischargeDate),
                    criteria: parseString('dischargeCriteria', object.dischargeCriteria)
                } });
        case 'OccupationalHealthcare':
            let sickLeave;
            if (object.sickLeaveStartDate && object.sickLeaveEndDate) {
                sickLeave = {
                    startDate: ParseDOB(object.sickLeaveStartDate),
                    endDate: ParseDOB(object.sickLeaveEndDate)
                };
            }
            return Object.assign(Object.assign({}, baseEntry), { type: 'OccupationalHealthcare', employerName: parseString('employerName', object.employerName), sickLeave });
        default:
            throw new Error(`Incorrect entry type`);
    }
};
exports.ToNewEntry = ToNewEntry;
const isRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseRating = (rating) => {
    if (!rating) {
        throw new Error(`Missing rating`);
    }
    const ratingNumber = parseInt(rating);
    if (isNaN(ratingNumber) || !isRating(ratingNumber)) {
        throw new Error(`Incorrect rating number: ${Object.values(types_1.HealthCheckRating).join(' | ')}`);
    }
    return ratingNumber;
};
const parseArrayStringCodes = (data) => {
    if (!data) {
        return [];
    }
    const codes = [];
    const error = '"diagnosisCodes" is an array of codes as string';
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const dataCodes = typeof data === 'object' ? data : JSON.parse(data);
        if (!Array.isArray(dataCodes))
            throw new Error(error);
        dataCodes.forEach((code) => {
            if (!isString(code)) {
                throw new Error(error);
            }
            codes.push(code);
        });
    }
    catch (error) {
        throw new Error(error);
    }
    return codes;
};
const parseString = (label, data) => {
    if (!data || !isString(data)) {
        throw new Error(`Incorrect or missing string: ${label}`);
    }
    return data;
};
