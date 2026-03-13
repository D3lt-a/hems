import { getAll, create, remove } from '../models/recModel.js'

export const getRecruitments = async (req, res) => {
    try {
        const data = await getAll()
        res.status(200).json({ message: 'Fetched recruitments', success: true, data })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recruitments', success: false })
    }
}

export const createRecruitment = async (req, res) => {
    try {
        await create(req.body)
        res.status(201).json({ message: 'Recruitment created', success: true })
    } catch (error) {
        res.status(500).json({ message: 'Error creating recruitment', success: false })
    }
}

export const deleteRecruitment = async (req, res) => {
    try {
        await remove(req.params.id)
        res.status(200).json({ message: 'Recruitment deleted', success: true })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting recruitment', success: false })
    }
}
