import { Pool } from 'pg'

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "10001", 10) || 10001,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "postgres",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

export { pool }