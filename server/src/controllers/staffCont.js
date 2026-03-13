import { getAll, create, update, remove } from '../models/staffModel.js'

export const getStaff = async (req, res) => {
    try {
        const staff = await getAll()
        res.status(200).json({ message: 'Fetched staff', success: true, data: staff })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching staff', success: false })
    }
}

export const getStaffMember = async (req, res) => {
    try {
        const member = await getOne(req.params.id)
        if (!member) return res.status(404).json({ message: 'Staff member not found', success: false })
        res.status(200).json({ message: 'Fetched staff member', success: true, data: member })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching staff member', success: false })
    }
}

export const createStaff = async (req, res) => {
    try {
        await create(req.body)
        res.status(201).json({ message: 'Staff member created', success: true })
    } catch (error) {
        res.status(500).json({ message: 'Error creating staff member', success: false })
    }
}

export const updateStaff = async (req, res) => {
    try {
        await update(req.params.id, req.body)
        res.status(200).json({ message: 'Staff member updated', success: true })
    } catch (error) {
        res.status(500).json({ message: 'Error updating staff member', success: false })
    }
}

export const deleteStaff = async (req, res) => {
    try {
        await remove(req.params.id)
        res.status(200).json({ message: 'Staff member deleted', success: true })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting staff member', success: false })
    }
}
