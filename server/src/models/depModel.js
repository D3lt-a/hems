import db from '../config/db.js'

export const create = async (name) => {
    const sql = `INSERT INTO departments(depName) VALUES (?)`
    try {
        const [rows] = await db.execute(sql, [name])
        console.log('👍 Created the Department')
        return rows
    } catch (error) {
        console.error('👎 Error creating department:', error)
    }
}

export const get = async () => {
    const sql = `SELECT depID as id, depName as name FROM departments`
    try {
        const [rows] = await db.execute(sql)
        console.log('👍 Got Departments')
        return rows
    } catch (error) {
        console.error('👎 Error getting departments:', error)
    }
}
