import { Entry, PatientEntry, PatientEntrySafe, PublicPatient } from "../types";
import patients from "../../data/patients";

export function GetPatients () : PatientEntry[] {
	return patients
}

export function GetByID(id : string): PatientEntry | undefined {
	return patients.find( each => each.id === id )
}

export function GetPatientsSafe() : PatientEntrySafe[] {
	return patients.map(({id, name, dateOfBirth,  gender, occupation, entries}) => ({id, name, dateOfBirth, gender, occupation, entries}) )
}

export function GetPatientsPublic() : PublicPatient[] {
	return patients.map(({id, name, dateOfBirth,  gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}) )
}

export function CreateDiaryEntry({id, name, dateOfBirth, ssn, gender, occupation, entries} : PatientEntry) : PatientEntry {
	const new_entry : PatientEntry = {
		id,
		name,
		dateOfBirth,
		ssn,
		gender,
		occupation,
		entries,
	} 

	patients.push(new_entry)
	return new_entry
}

export const addEntry = (patientId: string, entry: Entry): Entry => {

  const patient: PatientEntry | undefined = GetByID(patientId);
  if (!patient) {
    throw new Error(`Incorrect patient id`);
  }

  patient.entries.push(entry);

  return entry;
};