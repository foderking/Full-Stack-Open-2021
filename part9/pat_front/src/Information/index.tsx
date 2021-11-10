import React from "react";
import { useParams } from "react-router";
import { useStateValue } from '../state';
import { Icon } from 'semantic-ui-react';
import { Diagnosis, Patient } from "../types";

const Information = () =>
{
	const [{ patients, diagnoses }] = useStateValue();
	// const [{ diagnoses }] = useStateValue();
	const { id } = useParams<{ id: string }>();

	const patient = Object.values(patients).find(
		(patient: Patient) => patient.id === id
	);

	function GetDiag(code: string): Diagnosis['name']
	{
		const diag = Object.values(diagnoses).find( (each: Diagnosis) => each.code === code);
		console.log(diagnoses);
		return diag ? diag.name : 'undefined';
	}

	let iconName: 'man' | 'woman' | 'genderless';

	if (!patient) {
		return <p>No entry</p>;
	}
	else{
		switch (patient.gender) {
			case 'male':
				iconName = 'man';
				break;
			case 'female':
				iconName = 'woman';
				break;
			case 'other':
				iconName = 'genderless';
				break;
			default:
				iconName = 'woman';
		}
	}

	return (
		<div className='App'>
			<h2>
				{patient.name} <Icon name={iconName} />{' '}
			</h2>
			<p>ssn: {patient.ssn}</p>
			<p>occupation: {patient.occupation}</p>
			<h3>entries</h3>
			{patient.entries.map(each =>
				<div key={each.id} >
					{each.date}		{each.description}
					<ul>
						{
							each.diagnosisCodes ?
								each.diagnosisCodes.map(each => 
									<li key={each}>{each} { GetDiag(each) }</li>
								)
								:
								''
						}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Information;