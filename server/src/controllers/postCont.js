import { create, get } from '../models/postModel.js'

export const createPost = async(req, res) => {
    const { name } = req.body
    try {
        const results = await create(name)
        res.status(200).json({ message: 'Create a Post', success: true })
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', success: false })
    }
}

export const getPosts = async(req, res) => {
    try {
        const posts = await get()
        res.status(200).json({ message: 'Fetch Posts', success: true, data: posts })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', success: false })
    }
}