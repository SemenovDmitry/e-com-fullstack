import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

import {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProductById,
} from 'services/productService'
import handleRoutesError from 'utils/handleRoutesError'
import {
	createProductSchema,
	updateProductSchema,
	type ICreateProductInput,
	type IUpdateProductInput,
} from 'schemas/productSchema'
import { idParamsSchema } from 'validations/common'
import { zodValidationMiddleware } from 'middleware/validateParams'

export async function productRoutes(fastify: FastifyInstance) {
	// GET all products
	fastify.get('/products', async (_: FastifyRequest, reply: FastifyReply) => {
		try {
			const products = await getAllProducts()
			return reply.code(200).send(products)
		} catch (error) {
			return handleRoutesError(error, reply)
		}
	})

	// GET product by ID
	fastify.get('/products/:id', {
		preHandler: [zodValidationMiddleware(idParamsSchema, 'params')],
		handler: async (request: FastifyRequest, reply: FastifyReply) => {
			try {
				const { id } = request.params as { id: string }
				const product = await getProductById(id)

				if (!product) {
					return reply.code(404).send({ message: 'Product not found' })
				}

				return reply.code(200).send(product)
			} catch (error) {
				return handleRoutesError(error, reply)
			}
		},
	})

	// CREATE product
	fastify.post('/products', {
		preHandler: [zodValidationMiddleware(createProductSchema, 'body')],
		handler: async (request: FastifyRequest, reply: FastifyReply) => {
			try {
				const data = request.body as ICreateProductInput
				const product = await createProduct(data)
				return reply.code(201).send(product)
			} catch (error) {
				return handleRoutesError(error, reply)
			}
		},
	})

	// UPDATE product
	fastify.put('/products/:id', {
		preHandler: [
			zodValidationMiddleware(idParamsSchema, 'params'),
			zodValidationMiddleware(updateProductSchema, 'body'),
		],
		handler: async (request: FastifyRequest, reply: FastifyReply) => {
			try {
				const { id } = request.params as { id: string }
				const data = request.body as IUpdateProductInput
				const product = await updateProduct(id, data)

				if (!product) {
					return reply.code(404).send({ message: 'Product not found' })
				}

				return reply.code(200).send(product)
			} catch (error) {
				return handleRoutesError(error, reply)
			}
		},
	})

	// DELETE product
	fastify.delete('/products/:id', {
		preHandler: [zodValidationMiddleware(idParamsSchema, 'params')],
		handler: async (request: FastifyRequest, reply: FastifyReply) => {
			try {
				const { id } = request.params as { id: string }
				const deletedProduct = await deleteProductById(id)

				if (!deletedProduct) {
					return reply.code(404).send({ message: 'Product not found' })
				}

				return reply.code(200).send({ message: 'Product deleted', product: deletedProduct })
			} catch (error) {
				return handleRoutesError(error, reply)
			}
		},
	})
}
