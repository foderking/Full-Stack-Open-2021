export interface DiagEntry {
	code: string
	name: string
	latin?: string
}

export interface PatientEntry {
	id: string
	name: string
	dateOfBirth: string
	ssn: string
	gender: Gender
	occupation: string
}

export type PatientEntrySafe  = Omit<PatientEntry , 'ssn'>

export enum Gender {
	'male',
	'female'
}