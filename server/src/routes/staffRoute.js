import express from 'express'
import { getStaff, getStaffMember, createStaff, updateStaff, deleteStaff } from '../controllers/staffCont.js'

const router = express.Router()

router.get('/get', getStaff)
router.get('/get/:id', getStaffMember)
router.post('/create', createStaff)
router.put('/update/:id', updateStaff)
router.delete('/delete/:id', deleteStaff)

export default router
