import { GetPatientsSafe } from '../services/patients'

import express from 'express'
const router  = express.Router()

router.get('/', (_req, res) => {
	res.send( GetPatientsSafe() )
})

export default router