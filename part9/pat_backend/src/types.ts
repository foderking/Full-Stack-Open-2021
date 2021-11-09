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
	entries: []
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >


export type PatientEntrySafe  = Omit<PatientEntry , 'ssn'>

export enum Gender {
	'male',
	'female'
}