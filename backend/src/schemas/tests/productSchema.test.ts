import { describe, it, expect } from 'vitest'
import { createProductSchema, updateProductSchema } from '../schema'

describe('Product Schema Validation', () => {
	describe('createProductSchema', () => {
		it('should validate a valid product with all fields', () => {
			const validProduct = {
				name: 'Test Product',
				description: 'A test product',
				price: 29.99,
				quantity: 10,
			}
			const result = createProductSchema.safeParse(validProduct)
			expect(result.success).toBe(true)
			expect(result.data).toEqual(validProduct)
		})

		it('should validate a valid product with optional description', () => {
			const productWithoutDescription = {
				name: 'Test Product',
				price: 29.99,
				quantity: 10,
			}
			const result = createProductSchema.safeParse(productWithoutDescription)
			expect(result.success).toBe(true)
			expect(result.data?.description).toBe('')
		})

		it('should reject product with missing name', () => {
			const invalidProduct = {
				description: 'A test product',
				price: 29.99,
				quantity: 10,
			}
			const result = createProductSchema.safeParse(invalidProduct)
			expect(result.success).toBe(false)
			if (!result.success) {
				expect(result.error.issues[0]?.path[0]).toBe('name')
			}
		})

		it('should reject product with empty name', () => {
			const invalidProduct = {
				name: '',
				price: 29.99,
				quantity: 10,
			}
			const result = createProductSchema.safeParse(invalidProduct)
			expect(result.success).toBe(false)
			if (!result.success) {
				expect(result.error.issues[0]?.path[0]).toBe('name')
			}
		})

		it('should reject product with negative price', () => {
			const invalidProduct = {
				name: 'Test Product',
				price: -10,
				quantity: 10,
			}
			const result = createProductSchema.safeParse(invalidProduct)
			expect(result.success).toBe(false)
			if (!result.success) {
				expect(result.error.issues[0]?.message).toBe('Price cannot be negative')
			}
		})

		it('should accept product with zero price', () => {
			const productWithZeroPrice = {
				name: 'Free Product',
				price: 0,
				quantity: 5,
			}
			const result = createProductSchema.safeParse(productWithZeroPrice)
			expect(result.success).toBe(true)
		})

		it('should reject product with missing price', () => {
			const invalidProduct = {
				name: 'Test Product',
				quantity: 10,
			}
			const result = createProductSchema.safeParse(invalidProduct)
			expect(result.success).toBe(false)
		})

		it('should reject product with negative quantity', () => {
			const invalidProduct = {
				name: 'Test Product',
				price: 29.99,
				quantity: -5,
			}
			const result = createProductSchema.safeParse(invalidProduct)
			expect(result.success).toBe(false)
			if (!result.success) {
				expect(result.error.issues[0]?.message).toBe('Quantity cannot be negative')
			}
		})

		it('should accept product with zero quantity', () => {
			const productWithZeroQuantity = {
				name: 'Out of Stock',
				price: 29.99,
				quantity: 0,
			}
			const result = createProductSchema.safeParse(productWithZeroQuantity)
			expect(result.success).toBe(true)
		})

		it('should reject product with non-integer quantity', () => {
			const invalidProduct = {
				name: 'Test Product',
				price: 29.99,
				quantity: 10.5,
			}
			const result = createProductSchema.safeParse(invalidProduct)
			expect(result.success).toBe(false)
		})

		it('should reject product with missing quantity', () => {
			const invalidProduct = {
				name: 'Test Product',
				price: 29.99,
			}
			const result = createProductSchema.safeParse(invalidProduct)
			expect(result.success).toBe(false)
		})

		it('should handle long product names', () => {
			const longName = 'A'.repeat(255)
			const product = {
				name: longName,
				price: 29.99,
				quantity: 10,
			}
			const result = createProductSchema.safeParse(product)
			expect(result.success).toBe(true)
		})

		it('should handle long descriptions', () => {
			const longDescription = 'This is a very long description. '.repeat(100)
			const product = {
				name: 'Test Product',
				description: longDescription,
				price: 29.99,
				quantity: 10,
			}
			const result = createProductSchema.safeParse(product)
			expect(result.success).toBe(true)
		})

		it('should handle decimal prices correctly', () => {
			const product = {
				name: 'Test Product',
				price: 19.99,
				quantity: 10,
			}
			const result = createProductSchema.safeParse(product)
			expect(result.success).toBe(true)
			if (result.success) {
				expect(result.data.price).toBe(19.99)
			}
		})

		it('should reject non-string name', () => {
			const invalidProduct = {
				name: 123,
				price: 29.99,
				quantity: 10,
			}
			const result = createProductSchema.safeParse(invalidProduct)
			expect(result.success).toBe(false)
		})

		it('should reject non-number price', () => {
			const invalidProduct = {
				name: 'Test Product',
				price: '29.99',
				quantity: 10,
			}
			const result = createProductSchema.safeParse(invalidProduct)
			expect(result.success).toBe(false)
		})

		it('should reject non-number quantity', () => {
			const invalidProduct = {
				name: 'Test Product',
				price: 29.99,
				quantity: '10',
			}
			const result = createProductSchema.safeParse(invalidProduct)
			expect(result.success).toBe(false)
		})

		it('should reject non-string description', () => {
			const invalidProduct = {
				name: 'Test Product',
				description: 123,
				price: 29.99,
				quantity: 10,
			}
			const result = createProductSchema.safeParse(invalidProduct)
			expect(result.success).toBe(false)
		})
	})

	describe('updateProductSchema', () => {
		it('should allow partial update with only name', () => {
			const partialUpdate = {
				name: 'Updated Product',
			}
			const result = updateProductSchema.safeParse(partialUpdate)
			expect(result.success).toBe(true)
		})

		it('should allow partial update with only price', () => {
			const partialUpdate = {
				price: 39.99,
			}
			const result = updateProductSchema.safeParse(partialUpdate)
			expect(result.success).toBe(true)
		})

		it('should allow partial update with only quantity', () => {
			const partialUpdate = {
				quantity: 20,
			}
			const result = updateProductSchema.safeParse(partialUpdate)
			expect(result.success).toBe(true)
		})

		it('should allow partial update with only description', () => {
			const partialUpdate = {
				description: 'Updated description',
			}
			const result = updateProductSchema.safeParse(partialUpdate)
			expect(result.success).toBe(true)
		})

		it('should allow multiple fields in update', () => {
			const partialUpdate = {
				name: 'Updated Product',
				price: 39.99,
				quantity: 20,
			}
			const result = updateProductSchema.safeParse(partialUpdate)
			expect(result.success).toBe(true)
		})

		it('should allow empty update object', () => {
			const emptyUpdate = {}
			const result = updateProductSchema.safeParse(emptyUpdate)
			expect(result.success).toBe(true)
		})

		it('should reject invalid price in update', () => {
			const invalidUpdate = {
				price: -5,
			}
			const result = updateProductSchema.safeParse(invalidUpdate)
			expect(result.success).toBe(false)
		})

		it('should reject invalid quantity in update', () => {
			const invalidUpdate = {
				quantity: -10,
			}
			const result = updateProductSchema.safeParse(invalidUpdate)
			expect(result.success).toBe(false)
		})

		it('should reject empty name in update', () => {
			const invalidUpdate = {
				name: '',
			}
			const result = updateProductSchema.safeParse(invalidUpdate)
			expect(result.success).toBe(false)
		})

		it('should allow zero values in partial update', () => {
			const updateWithZeros = {
				price: 0,
				quantity: 0,
			}
			const result = updateProductSchema.safeParse(updateWithZeros)
			expect(result.success).toBe(true)
		})
	})

	describe('Error Messages', () => {
		it('should provide clear error for missing required field', () => {
			const invalid = { price: 29.99, quantity: 10 }
			const result = createProductSchema.safeParse(invalid)
			expect(result.success).toBe(false)
			if (!result.success) {
				const errors = result.error.flatten().fieldErrors
				expect(errors).toHaveProperty('name')
			}
		})

		it('should collect multiple validation errors', () => {
			const invalid = {
				name: '',
				price: -10,
				quantity: -5,
			}
			const result = createProductSchema.safeParse(invalid)
			expect(result.success).toBe(false)
			if (!result.success) {
				expect(result.error.issues.length).toBeGreaterThan(1)
			}
		})
	})
})
