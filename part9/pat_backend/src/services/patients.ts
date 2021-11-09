import { PatientEntry, PatientEntrySafe } from "../types";
import patients from "../../data/patients";

export function GetPatients () : PatientEntry[] {
	return patients
}
export function GetPatientsSafe() : PatientEntrySafe[] {
	return patients.map(({id, name, dateOfBirth,  gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}) )
}

export function CreateDiaryEntry({id, name, dateOfBirth, ssn, gender, occupation} : PatientEntry) : PatientEntry {
	const new_entry : PatientEntry = {
		id,
		name,
		dateOfBirth,
		ssn,
		gender,
		occupation
	} 

	patients.push(new_entry)
	return new_entry
}