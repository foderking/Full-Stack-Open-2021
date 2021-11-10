import { BaseEntry, DiagEntry, Entry, Gender, HealthCheckRating, PatientEntry } from "./types";
import { v1 as uuid } from 'uuid'

type Fields = {
	id: unknown,
	name: unknown,
	dateOfBirth: unknown,
	ssn : unknown,
	gender: unknown,
	occupation:unknown
}

export function ToPatientEntry({ name, dateOfBirth, ssn, gender, occupation }: Fields) : PatientEntry
{
	const newentry : PatientEntry = {
		id : ParseId(uuid()),
		name: ParseName(name),
		dateOfBirth: ParseDOB(dateOfBirth),
		ssn: ParseSSN(ssn),
		gender: ParseGender(gender),
		occupation: ParseOccu(occupation),
		entries: []
	}

	return newentry
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

function ParseId(id: unknown) : string
{
	if (!id || !isString(id)) {
    throw new Error('Incorrect or missing comment');
  }

  return id;
}

function ParseName(name: unknown) : string
{
	if (!name || !isString(name)) {
    throw new Error('Incorrect or missing comment');
  }

  return name;
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};


function ParseDOB(dob: unknown) : string
{
	if (!dob || !isString(dob) || !isDate(dob)) {
    throw new Error('Incorrect or missing comment');
  }

  return dob;
}

function ParseSSN(ssn: unknown) : string
{
	if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing comment');
  }

  return ssn;
}

const isGender = (str: any): str is Gender => {
  return Object.values(Gender).includes(str);
};

function ParseGender(gender: unknown) : Gender
{
	if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing comment');
  }

  return gender;
}

function ParseOccu(occupation: unknown) : string
{
	if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing comment');
  }

  return occupation;
}

export const ToNewEntry = (object: any): Entry => {
  const baseEntry: BaseEntry = {
    id: uuid(),
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
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseRating(object.healthCheckRating)
      };

    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: {
          date: ParseDOB(object.dischargeDate),
          criteria: parseString('dischargeCriteria', object.dischargeCriteria)
        }
      };

    case 'OccupationalHealthcare':
      let sickLeave;
      if (object.sickLeaveStartDate && object.sickLeaveEndDate) {
        sickLeave = {
          startDate: ParseDOB(object.sickLeaveStartDate),
          endDate: ParseDOB(object.sickLeaveEndDate)
        };
      }
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString('employerName', object.employerName),
        sickLeave
      };

    default:
      throw new Error(`Incorrect entry type`);
  }
};


const isRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating: any): HealthCheckRating => {
  if (!rating) {
    throw new Error(`Missing rating`);
  }
  const ratingNumber: number = parseInt(rating);
  if (isNaN(ratingNumber) || !isRating(ratingNumber)) {
    throw new Error(`Incorrect rating number: ${Object.values(HealthCheckRating).join(' | ')}`);
  }
  return ratingNumber;
};

const parseArrayStringCodes = (data: any): Array<DiagEntry['code']> => {

  if (!data) {
    return [];
  }

  const codes: Array<DiagEntry['code']> = [];
  const error = '"diagnosisCodes" is an array of codes as string';

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dataCodes: Array<DiagEntry['code']> = typeof data === 'object' ? data : JSON.parse(data);
    if (!Array.isArray(dataCodes)) throw new Error(error);

    dataCodes.forEach((code) => {
      if (!isString(code)) {
        throw new Error(error);
      }
      codes.push(code);
    });

  } catch (error: any) {
    throw new Error(error);
  }

  return codes;
};

const parseString = (label: string, data: any): string => {
  if (!data || !isString(data)) {
    throw new Error(`Incorrect or missing string: ${label}`);
  }

  return data;
};
