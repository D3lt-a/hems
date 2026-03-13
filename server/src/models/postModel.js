import db from '../config/db.js'

export const create = async (name) => {
    const sql = `INSERT INTO posts (postTitle) VALUES (?)`
    try {
        const [result] = await db.execute(sql, [name])
        console.log('👍 Created post')
        return result
    } catch (error) {
        console.error('👎 Error creating post:', error)
        throw error
    }
}

export const get = async () => {
    const sql = `SELECT postID as id, postTitle as name FROM posts`
    try {
        const [results] = await db.execute(sql)
        console.log('👍 Fetched posts')
        return results
    } catch (error) {
        console.error('👎 Error fetching posts:', error)
        throw error
    }
}
