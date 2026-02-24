import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import pool from '../database'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const runMigration = async () => {
	const migrationPath = path.join(__dirname, '001_rename_auth_token_to_token.sql')
	const sql = fs.readFileSync(migrationPath, 'utf-8')

	try {
		console.log('Running migration: rename_auth_token_to_token...')
		await pool.query(sql)
		console.log('✓ Migration completed successfully')
	} catch (error) {
		console.error('✗ Migration failed:', error)
		process.exit(1)
	} finally {
		await pool.end()
	}
}

runMigration()
