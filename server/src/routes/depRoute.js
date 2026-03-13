import { createDep, getDeps } from '../controllers/depCont.js'
import express from 'express'

const router = express.Router()

router.post('/create',createDep)
router.get('/get',getDeps)

export default router