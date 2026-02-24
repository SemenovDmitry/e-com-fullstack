import type { IProduct } from 'schemas/schema'

export const productResponseSanitizer = (data: IProduct): IProduct => {
	return {
		id: data.id,
		name: data.name,
		description: data.description,
		price: data.price,
		quantity: data.quantity,
		createdAt: data.createdAt,
		updatedAt: data.updatedAt,
	}
}
