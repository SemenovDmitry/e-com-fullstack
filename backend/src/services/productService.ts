import productRepository from 'repositories/productRepository'
import type { ICreateProductInput, IUpdateProductInput } from 'schemas/productSchema'
import type { IProduct } from 'types/product'

export const getAllProducts = async (): Promise<IProduct[]> => {
	return productRepository.getAll()
}

export const getProductById = async (id: string): Promise<IProduct | null> => {
	return productRepository.getById(id)
}

export const createProduct = async (data: ICreateProductInput): Promise<IProduct> => {
	return productRepository.create(data)
}

export const updateProduct = async (
	id: string,
	data: IUpdateProductInput
): Promise<IProduct | null> => {
	return productRepository.update(id, data)
}

export const deleteProductById = async (id: string): Promise<IProduct | null> => {
	return productRepository.delete(id)
}
