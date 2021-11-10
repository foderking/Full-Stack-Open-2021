import React from "react";
import { useParams } from "react-router";
import { addEntry, useStateValue } from '../state';
import { Icon, Button, Card, SemanticICONS } from 'semantic-ui-react';
import { Patient } from "../types";
import { Entry } from "../types";
import { AddEntryModal } from '../AddPatientModal';
import { EntryFormValues } from '../AddPatientModal/AddPatientForm';
import { apiBaseUrl } from "../constants";
import axios from "axios";
// import {
//   updatePatient,
//   setDiagnosisList,
// } from '../state';

const Information = () =>
{
  const [, dispatch] = useStateValue();
	const [{ patients }] = useStateValue();
	const { id } = useParams<{ id: string }>();

	const patient = Object.values(patients).find(
		(patient: Patient) => patient.id === id
	);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };


  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        apiBaseUrl + '/patients/' + values.id + '/entries',
        values
      );
      dispatch(addEntry(values.id, newEntry));
      patient && patient.entries.push(newEntry);
      closeModal();
    } catch (e: any) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };


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
			<AddEntryModal
				modalOpen={modalOpen}
				onSubmit={submitNewEntry}
				error={error}
				onClose={closeModal}
				patientId={patient.id}
			/>
			<Button onClick={() => openModal()}>Add New Entry</Button>
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