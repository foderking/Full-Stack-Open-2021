import { addEntry, CreateDiaryEntry, GetByID, GetPatients } from '../services/patients'
import { ToPatientEntry, ToNewEntry } from '../Utils'

import express from 'express'
import { Entry } from '../types'
const router  = express.Router()

router.get('/', (_req, res) => {
	res.send( GetPatients() )
})

router.get('/:id', (req, res) => {
	const id = req.params.id
	res.send( GetByID(id) )
	// res.send( GetPatientsSafe() )
})

router.post('/', (req, res) => {
	try {
		const new_diary_entry  = ToPatientEntry(req.body)

		const new_entry = CreateDiaryEntry(new_diary_entry)
		res.json(new_entry)
	}
	catch (error){
		let errorMessage = 'Something went wrong.'

    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
	}
})

router.post('/:id/entries', (req, res) => {
  const { id } = req.params;
  try {
    const newEntry: Entry = ToNewEntry(req.body);

    const addedEntry = addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Undefined error';
    res.status(400).send(errorMessage);
  }
});

export default router