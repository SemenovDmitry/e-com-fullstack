import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import pool from './database'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function initDb() {
	try {
		console.log('Initializing database schema...')

		const schemaPath = path.join(__dirname, 'schema.sql')
		const schema = fs.readFileSync(schemaPath, 'utf-8')

		await pool.query(schema)
		console.log('✓ Database schema initialized successfully')

		process.exit(0)
	} catch (error) {
		console.error('Error initializing database:', error)
		process.exit(1)
	}
}

initDb()
