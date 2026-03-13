import express from 'express'
import { getRecruitments, createRecruitment, deleteRecruitment } from '../controllers/recCont.js'

const router = express.Router()

router.get('/get', getRecruitments)
router.post('/create', createRecruitment)
router.delete('/delete/:id', deleteRecruitment)

export default router
