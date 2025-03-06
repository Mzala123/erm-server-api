import express from 'express'
import {createPatientRecord} from '../controller/patient.js'

var router = express.Router()


// patient apis

router.post('/patient', createPatientRecord)



export default router