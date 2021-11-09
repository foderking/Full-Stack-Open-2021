import { Gender, PatientEntry } from "./types";
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
		occupation: ParseOccu(occupation)
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




