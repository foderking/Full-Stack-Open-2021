import { GetPatientsSafe, CreateDiaryEntry, GetByID } from '../services/patients'
import { ToPatientEntry } from '../Utils'

import express from 'express'
const router  = express.Router()

router.get('/', (_req, res) => {
	res.send( GetPatientsSafe() )
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

export default router