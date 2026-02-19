import productRepository from 'repositories/productRepository'
import type { CreateProductDto, IProduct, UpdateProductDto } from 'types/product'

export const getAllProducts = async (): Promise<IProduct[]> => {
	return productRepository.getAll()
}

export const getProductById = async (id: string): Promise<IProduct | null> => {
	if (!id) {
		throw new Error('Product ID is required')
	}
	return productRepository.getById(id)
}

export const createProduct = async (data: CreateProductDto): Promise<IProduct> => {
	if (!data.name || !data.price) {
		throw new Error('Product name and price are required')
	}
	if (data.price < 0) {
		throw new Error('Product price cannot be negative')
	}
	if (data.quantity < 0) {
		throw new Error('Product quantity cannot be negative')
	}
	return productRepository.create(data)
}

export const updateProduct = async (
	id: string,
	data: UpdateProductDto
): Promise<IProduct | null> => {
	if (!id) {
		throw new Error('Product ID is required')
	}
	if (data.price !== undefined && data.price < 0) {
		throw new Error('Product price cannot be negative')
	}
	if (data.quantity !== undefined && data.quantity < 0) {
		throw new Error('Product quantity cannot be negative')
	}
	return productRepository.update(id, data)
}

export const deleteProductById = async (id: string): Promise<IProduct | null> => {
	if (!id) {
		throw new Error('Product ID is required')
	}
	return productRepository.delete(id)
}
