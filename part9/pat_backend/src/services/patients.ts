import { PatientEntry } from "../types";
import patients from "../../data/patients";

export function GetPatients () : PatientEntry[] {
	return patients
}

export function GetPatientsSafe() : Omit<PatientEntry , 'ssn'>[] {
	return patients.map(({id, name, dateOfBirth,  gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}) )
}

