import 'dotenv/config'
import { createUser, getUser, getAllUsers } from '../models/userModel.js'
import bcrypt from 'bcryptjs'

export const registerUser = async (req, res) => {
    const { empID, name, key } = req.body
    const salt = 10
    const hashedKey = await bcrypt.hash(key, salt)
    try {
        const user = await createUser(empID, name, hashedKey)
        if (!user) {
            res.status(500).json({ message: 'Recheck the Credentials' })
        } else {
            res.status(201).json({ message: 'Registered the User' })
        }
    } catch (error) {
        res.status(500).json({ message: "Couldn't register the user" })
    }
}

export const loginUser = async (req, res) => {
    const { name, key } = req.body
    try {
        const results = await getUser(name)
        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'User not found' })
        }
        const user = results[0]
        const isMatch = await bcrypt.compare(key, user.passkey)
        if (isMatch) {
            // Return user info so frontend can store it
            res.status(200).json({
                message: 'Logged in successfully',
                user: { id: user.id, username: user.uname, empID: user.empID }
            })
        } else {
            res.status(400).json({ message: 'Invalid credentials' })
        }
    } catch (error) {
        res.status(500).json({ message: "Couldn't log in the user" })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers()
        res.status(200).json({ message: 'Fetched users', success: true, data: users })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', success: false })
    }
}
