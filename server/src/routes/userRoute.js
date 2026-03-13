import { registerUser, loginUser, getUsers } from '../controllers/userCont.js'
import express from 'express'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/get', getUsers)

export default router
