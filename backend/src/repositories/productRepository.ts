import type { IProduct } from 'schemas/schema'
import pool from 'db/database'
import { productResponseSanitizer } from 'sanitizers/productSanitizer'
import { DatabaseError } from 'utils/errors'
import type { ICreateProductInput, IUpdateProductInput } from 'schemas/schema'

const buildUpdateClause = (data: IUpdateProductInput) => {
	const updates: string[] = []
	const values: (string | number)[] = []
	let count = 1

	for (const [key, value] of Object.entries(data)) {
		if (value !== undefined) {
			updates.push(`${key} = $${count++}`)
			values.push(value)
		}
	}

	return { updates, values }
}

const getAll = async (): Promise<IProduct[]> => {
	try {
		const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC')
		return result.rows.map(productResponseSanitizer)
	} catch (error) {
		console.error('Error fetching products:', error)
		throw new DatabaseError('Failed to fetch products', error)
	}
}

const getById = async (id: string): Promise<IProduct | null> => {
	try {
		const result = await pool.query('SELECT * FROM products WHERE id = $1', [id])

		if (result.rows.length === 0) return null

		const row = result.rows[0]

		return productResponseSanitizer(row)
	} catch (error) {
		console.error('Error fetching product by id:', error)
		throw new DatabaseError('Failed to fetch product', error)
	}
}

const create = async (data: ICreateProductInput): Promise<IProduct> => {
	try {
		const result = await pool.query(
			'INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
			[data.name, data.description, data.price, data.quantity]
		)

		const row = result.rows[0]

		return productResponseSanitizer(row)
	} catch (error) {
		console.error('Error creating product:', error)
		throw new DatabaseError('Failed to create product', error)
	}
}

const update = async (id: string, data: IUpdateProductInput): Promise<IProduct | null> => {
	try {
		const { updates, values } = buildUpdateClause(data)

		if (updates.length === 0) {
			return getById(id)
		}

		updates.push(`updated_at = CURRENT_TIMESTAMP`)
		values.push(id)

		const paramCount = values.length

		const result = await pool.query(
			`UPDATE products SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
			values
		)

		if (result.rows.length === 0) return null

		const row = result.rows[0]

		return productResponseSanitizer(row)
	} catch (error) {
		console.error('Error updating product:', error)
		throw new DatabaseError('Failed to update product', error)
	}
}

const deleteProduct = async (id: string): Promise<IProduct | null> => {
	try {
		const product = await getById(id)

		if (!product) return null

		await pool.query('DELETE FROM products WHERE id = $1', [id])

		return product
	} catch (error) {
		console.error('Error deleting product:', error)
		throw new DatabaseError('Failed to delete product', error)
	}
}

export default {
	getAll,
	getById,
	create,
	update,
	delete: deleteProduct,
}
