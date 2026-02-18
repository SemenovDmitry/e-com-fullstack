import { findAll, findById, create, update, deleteProduct } from "repositories/productRepository"
import type { CreateProductDto, IProduct, UpdateProductDto } from "types/product"

export const getAllProducts = (): IProduct[] => {
	return findAll()
}

export const getProductById = (id: string): IProduct | null => {
	if (!id) {
		throw new Error("Product ID is required")
	}
	return findById(id)
}

export const createProduct = (data: CreateProductDto): IProduct => {
	if (!data.name || !data.price) {
		throw new Error("Product name and price are required")
	}
	if (data.price < 0) {
		throw new Error("Product price cannot be negative")
	}
	if (data.quantity < 0) {
		throw new Error("Product quantity cannot be negative")
	}
	return create(data)
}

export const updateProduct = (id: string, data: UpdateProductDto): IProduct | null => {
	if (!id) {
		throw new Error("Product ID is required")
	}
	if (data.price !== undefined && data.price < 0) {
		throw new Error("Product price cannot be negative")
	}
	if (data.quantity !== undefined && data.quantity < 0) {
		throw new Error("Product quantity cannot be negative")
	}
	return update(id, data)
}

export const deleteProductById = (id: string): boolean => {
	if (!id) {
		throw new Error("Product ID is required")
	}
	return deleteProduct(id)
}
