import db from '../config/db.js'

export const getAll = async () => {
    const sql = `
        SELECT r.recID as id, r.empID, r.hiredate, r.salary, r.status,
               s.fname, s.lname,
               d.depName AS department,
               p.postTitle AS post
        FROM recruitments r
        LEFT JOIN staff s ON r.empID = s.empID
        LEFT JOIN departments d ON s.depID = d.depID
        LEFT JOIN posts p ON s.postID = p.postID
    `
    try {
        const [rows] = await db.execute(sql)
        return rows
    } catch (error) {
        console.error('👎 Error fetching recruitments:', error)
        throw error
    }
}

export const create = async (data) => {
    const { empID, hiredate, salary, status } = data
    const sql = `INSERT INTO recruitments (empID, hiredate, salary, status) VALUES (?, ?, ?, ?)`
    try {
        const [result] = await db.execute(sql, [empID, hiredate || null, salary, status || 'Pending'])
        return result
    } catch (error) {
        console.error('👎 Error creating recruitment:', error)
        throw error
    }
}

export const remove = async (id) => {
    const sql = `DELETE FROM recruitments WHERE recID = ?`
    try {
        const [result] = await db.execute(sql, [id])
        return result
    } catch (error) {
        console.error('👎 Error deleting recruitment:', error)
        throw error
    }
}
