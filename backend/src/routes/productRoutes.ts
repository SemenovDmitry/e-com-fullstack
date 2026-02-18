import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify"
import { productService } from "services/productService.js"
import type { CreateProductDto, UpdateProductDto } from "types/product.js"

export async function productRoutes(fastify: FastifyInstance) {
	// GET all products
	fastify.get("/products", async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const products = productService.getAllProducts()
			return reply.code(200).send(products)
		} catch (error) {
			return reply.code(500).send({ message: (error as Error).message })
		}
	})

	// GET product by ID
	fastify.get("/products/:id", async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const { id } = request.params as { id: string }
			const product = productService.getProductById(id)

			if (!product) {
				return reply.code(404).send({ message: "Product not found" })
			}

			return reply.code(200).send(product)
		} catch (error) {
			return reply.code(400).send({ message: (error as Error).message })
		}
	})

	// CREATE product
	fastify.post("/products", async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const data = request.body as CreateProductDto
			const product = productService.createProduct(data)
			return reply.code(201).send(product)
		} catch (error) {
			return reply.code(400).send({ message: (error as Error).message })
		}
	})

	// UPDATE product
	fastify.put("/products/:id", async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const { id } = request.params as { id: string }
			const data = request.body as UpdateProductDto
			const product = productService.updateProduct(id, data)

			if (!product) {
				return reply.code(404).send({ message: "Product not found" })
			}

			return reply.code(200).send(product)
		} catch (error) {
			return reply.code(400).send({ message: (error as Error).message })
		}
	})

	// DELETE product
	fastify.delete("/products/:id", async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			const { id } = request.params as { id: string }
			const success = productService.deleteProduct(id)

			if (!success) {
				return reply.code(404).send({ message: "Product not found" })
			}

			return reply.code(200).send({ message: "Product deleted" })
		} catch (error) {
			return reply.code(400).send({ message: (error as Error).message })
		}
	})
}
