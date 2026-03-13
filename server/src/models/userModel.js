import db from '../config/db.js'

export const createUser = async (empID, name, key) => {
    const sql = `INSERT INTO users(empID, uname, passkey) VALUES (?, ?, ?)`
    try {
        const [rows] = await db.execute(sql, [empID, name, key])
        return rows
    } catch (error) {
        console.error('👎 Error creating user:', error)
    }
}

export const getUser = async (uname) => {
    const sql = `SELECT * FROM users WHERE uname = ?`
    try {
        const [rows] = await db.execute(sql, [uname])
        return rows
    } catch (error) {
        console.error('👎 Error getting user:', error)
    }
}

export const getAllUsers = async () => {
    const sql = `SELECT userID as id, empID, uname FROM users`
    try {
        const [rows] = await db.execute(sql)
        return rows
    } catch (error) {
        console.error('👎 Error getting all users:', error)
        throw error
    }
}
