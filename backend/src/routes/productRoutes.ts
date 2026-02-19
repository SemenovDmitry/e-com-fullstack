import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

import {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProductById,
} from 'services/productService'
import type { CreateProductDto, UpdateProductDto } from 'types/product'

export async function productRoutes(fastify: FastifyInstance) {
	// GET all products
	fastify.get('/products', async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const products = await getAllProducts()
			return reply.code(200).send(products)
		} catch (error) {
			return reply.code(500).send({ message: (error as Error).message })
		}
	})

	// GET product by ID
	fastify.get('/products/:id', async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const { id } = request.params as { id: string }
			const product = await getProductById(id)

			if (!product) {
				return reply.code(404).send({ message: 'Product not found' })
			}

			return reply.code(200).send(product)
		} catch (error) {
			return reply.code(400).send({ message: (error as Error).message })
		}
	})

	// CREATE product
	fastify.post('/products', async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const data = request.body as CreateProductDto
			const product = await createProduct(data)
			return reply.code(201).send(product)
		} catch (error) {
			return reply.code(400).send({ message: (error as Error).message })
		}
	})

	// UPDATE product
	fastify.put('/products/:id', async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const { id } = request.params as { id: string }
			const data = request.body as UpdateProductDto
			const product = await updateProduct(id, data)

			if (!product) {
				return reply.code(404).send({ message: 'Product not found' })
			}

			return reply.code(200).send(product)
		} catch (error) {
			return reply.code(400).send({ message: (error as Error).message })
		}
	})

	// DELETE product
	fastify.delete('/products/:id', async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const { id } = request.params as { id: string }
			const deletedProduct = await deleteProductById(id)

			if (!deletedProduct) {
				return reply.code(404).send({ message: 'Product not found' })
			}

			return reply.code(200).send({ message: 'Product deleted', product: deletedProduct })
		} catch (error) {
			return reply.code(400).send({ message: (error as Error).message })
		}
	})
}
