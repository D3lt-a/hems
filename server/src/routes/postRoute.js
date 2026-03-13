import { createPost, getPosts } from '../controllers/postCont.js'
import express from 'express'

const router = express.Router()

router.post('/create', createPost)
router.get('/get', getPosts)

export default router