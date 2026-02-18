import type { CreateProductDto, IProduct, UpdateProductDto } from "types/product"
import uuid from "utils/uuid"

let products: IProduct[] = [
	{
		id: uuid(),
		name: "Laptop",
		description: "111 High-performance laptop for professionals",
		price: 1299.99,
		quantity: 5,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: uuid(),
		name: "Wireless Mouse",
		description: "Ergonomic wireless mouse with long battery life",
		price: 49.99,
		quantity: 20,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: uuid(),
		name: "USB-C Cable",
		description: "Fast charging USB-C cable 2 meters",
		price: 19.99,
		quantity: 50,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
]

export const findAll = (): IProduct[] => {
	return products
}

export const findById = (id: string): IProduct | null => {
	return products.find((p) => p.id === id) || null
}

export const create = (data: CreateProductDto): IProduct => {
	const product: IProduct = {
		id: uuid(),
		...data,
		createdAt: new Date(),
		updatedAt: new Date(),
	}
	products.push(product)
	return product
}

export const update = (id: string, data: UpdateProductDto): IProduct | null => {
	const product = findById(id)
	if (!product) return null

	Object.assign(product, data, { updatedAt: new Date() })
	return product
}

export const deleteProduct = (id: string): boolean => {
	const index = products.findIndex((p) => p.id === id)
	if (index === -1) return false
	products.splice(index, 1)
	return true
}
