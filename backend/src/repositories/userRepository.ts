import pool from 'db/database'
import { DatabaseError } from 'utils/errors'
import type { IUser } from 'schemas/schema'
import type { ICreateUserInput } from 'schemas/schema'
import snakeToCamelCase from 'utils/snakeToCamelCase'

const getAll = async (): Promise<IUser[]> => {
	try {
		const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC')
		return result.rows.map((row) => snakeToCamelCase(row))
	} catch (error) {
		console.error('Error fetching users:', error)
		throw new DatabaseError('Failed to fetch users', error)
	}
}

const getById = async (id: string): Promise<IUser | null> => {
	try {
		const result = await pool.query('SELECT * FROM users WHERE id = $1', [id])

		if (result.rows.length === 0) return null

		return snakeToCamelCase(result.rows[0])
	} catch (error) {
		console.error('Error fetching user by id:', error)
		throw new DatabaseError('Failed to fetch user', error)
	}
}

const getByEmail = async (email: string): Promise<IUser | null> => {
	try {
		const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])

		if (result.rows.length === 0) return null

		return snakeToCamelCase(result.rows[0])
	} catch (error) {
		console.error('Error fetching user by email:', error)
		throw new DatabaseError('Failed to fetch user', error)
	}
}

const getByToken = async (token: string): Promise<IUser | null> => {
	try {
		const result = await pool.query(
			'SELECT * FROM users WHERE token = $1 AND token_expires_at > CURRENT_TIMESTAMP',
			[token]
		)

		if (result.rows.length === 0) return null

		return snakeToCamelCase(result.rows[0])
	} catch (error) {
		console.error('Error fetching user by token:', error)
		throw new DatabaseError('Failed to fetch user', error)
	}
}

const create = async (data: ICreateUserInput): Promise<IUser> => {
	try {
		const result = await pool.query(
			'INSERT INTO users (email, first_name, last_name, phone, avatar, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
			[
				data.email,
				data.firstName,
				data.lastName,
				data.phone || null,
				data.avatar || null,
				data.address || null,
			]
		)

		return snakeToCamelCase(result.rows[0])
	} catch (error) {
		console.error('Error creating user:', error)
		throw new DatabaseError('Failed to create user', error)
	}
}

const updateToken = async (id: string, token: string, expiresAt: Date): Promise<IUser | null> => {
	try {
		const result = await pool.query(
			'UPDATE users SET token = $1, token_expires_at = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
			[token, expiresAt, id]
		)

		if (result.rows.length === 0) return null

		return snakeToCamelCase(result.rows[0])
	} catch (error) {
		console.error('Error updating token:', error)
		throw new DatabaseError('Failed to update token', error)
	}
}

const clearToken = async (id: string): Promise<IUser | null> => {
	try {
		const result = await pool.query(
			'UPDATE users SET token = NULL, token_expires_at = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
			[id]
		)

		if (result.rows.length === 0) return null

		return snakeToCamelCase(result.rows[0])
	} catch (error) {
		console.error('Error clearing token:', error)
		throw new DatabaseError('Failed to clear token', error)
	}
}

const deleteUser = async (id: string): Promise<IUser | null> => {
	try {
		const user = await getById(id)

		if (!user) return null

		await pool.query('DELETE FROM users WHERE id = $1', [id])

		return user
	} catch (error) {
		console.error('Error deleting user:', error)
		throw new DatabaseError('Failed to delete user', error)
	}
}

export default {
	getAll,
	getById,
	getByEmail,
	getByToken,
	create,
	updateToken,
	clearToken,
	delete: deleteUser,
}
