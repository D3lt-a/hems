import db from '../config/db.js'

export const getAll = async () => {
    const sql = `
        SELECT s.empID as id, s.fname, s.lname, s.gender, s.dob,
               s.email, s.phone, s.address, s.depID, s.postID,
               d.depName AS department,
               p.postTitle AS post,
               r.hiredate, r.salary, r.status AS recruitmentStatus
        FROM staff s
        LEFT JOIN departments d ON s.depID = d.depID
        LEFT JOIN posts p ON s.postID = p.postID
        LEFT JOIN recruitments r ON s.empID = r.empID
    `
    try {
        const [rows] = await db.execute(sql)
        return rows
    } catch (error) {
        console.error('👎 Error fetching staff:', error)
        throw error
    }
}

export const create = async (data) => {
    const { fname, lname, gender, dob, email, phone, address, depID, postID } = data
    const sql = `
        INSERT INTO staff (fname, lname, gender, dob, email, phone, address, depID, postID)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    try {
        const [result] = await db.execute(sql, [fname, lname, gender, dob, email, phone, address, depID, postID])
        return result
    } catch (error) {
        console.error('👎 Error creating staff:', error)
        throw error
    }
}

export const update = async (id, data) => {
    const { fname, lname, gender, dob, email, phone, address, depID, postID } = data
    const sql = `
        UPDATE staff SET fname=?, lname=?, gender=?, dob=?, email=?,
        phone=?, address=?, depID=?, postID=? WHERE empID=?
    `
    try {
        const [result] = await db.execute(sql, [fname, lname, gender, dob, email, phone, address, depID, postID, id])
        return result
    } catch (error) {
        console.error('👎 Error updating staff:', error)
        throw error
    }
}

export const remove = async (id) => {
    const sql = `DELETE FROM staff WHERE empID = ?`
    try {
        const [result] = await db.execute(sql, [id])
        return result
    } catch (error) {
        console.error('👎 Error deleting staff:', error)
        throw error
    }
}
