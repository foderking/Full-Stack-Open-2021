import React from "react";
import { useParams } from "react-router";
import { useStateValue } from '../state';
import { Icon, Card, SemanticICONS } from 'semantic-ui-react';
import { Patient } from "../types";
import { Entry } from "../types";

const Information = () =>
{
	const [{ patients }] = useStateValue();
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
			<h3>entries</h3>
			{
				patient.entries.map(each =>
					<EntryDetail key={each.id} entry={each} symbol={ GetSymbol(each.type)}/>
				)
			}
		</div>
	);
};

function GetSymbol(type: Entry['type']): SemanticICONS
{
	switch (type) {
		case 'HealthCheck':
			return 'hospital symbol';
		case 'Hospital':
			return 'user doctor';
		case 'OccupationalHealthcare':
			return 'user doctor';
	}
}

const EntryDetail: React.FC<{ entry: Entry, symbol: SemanticICONS }> = ({entry, symbol}) =>
{
	const style = { margin: 10};

	return (
		<div>
			<Card style={style}>
				<Card.Content>
					{entry.date} <Icon name={symbol} />
				</Card.Content>
				<Card.Content description={entry.description} />
			</Card>
		</div>
	);
};

export default Information;