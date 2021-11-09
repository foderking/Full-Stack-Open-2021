import React from "react";
import { useParams } from "react-router";
import { useStateValue } from '../state';
import { Icon } from 'semantic-ui-react';
import { Patient } from "../types";

const Information = () =>
{
	const [{ patients }] = useStateValue();
	// const [{ diagnoses }] = useStateValue();
	const { id } = useParams<{ id: string }>();

	const patient = Object.values(patients).find(
		(patient: Patient) => patient.id === id
	);

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
		</div>
	);
};

export default Information;