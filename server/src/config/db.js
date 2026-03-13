import 'dotenv/config';
import mysql2 from "mysql2/promise";

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

try {
    const conn = pool.getConnection()
    console.log('👍 Connected to the DB')
} catch (error) {
    console.error('👎 Couldn\'t connect to the DB', error)
}

export default pool;