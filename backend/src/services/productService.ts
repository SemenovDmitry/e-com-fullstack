import { productRepository } from "repositories/productRepository.js"
import type { CreateProductDto, IProduct, UpdateProductDto } from "types/product.js"

class ProductService {
	getAllProducts(): IProduct[] {
		return productRepository.findAll()
	}

	getProductById(id: string): IProduct | null {
		if (!id) {
			throw new Error("Product ID is required")
		}
		return productRepository.findById(id)
	}

	createProduct(data: CreateProductDto): IProduct {
		if (!data.name || !data.price) {
			throw new Error("Product name and price are required")
		}
		if (data.price < 0) {
			throw new Error("Product price cannot be negative")
		}
		if (data.quantity < 0) {
			throw new Error("Product quantity cannot be negative")
		}
		return productRepository.create(data)
	}

	updateProduct(id: string, data: UpdateProductDto): IProduct | null {
		if (!id) {
			throw new Error("Product ID is required")
		}
		if (data.price !== undefined && data.price < 0) {
			throw new Error("Product price cannot be negative")
		}
		if (data.quantity !== undefined && data.quantity < 0) {
			throw new Error("Product quantity cannot be negative")
		}
		return productRepository.update(id, data)
	}

	deleteProduct(id: string): boolean {
		if (!id) {
			throw new Error("Product ID is required")
		}
		return productRepository.delete(id)
	}
}

export const productService = new ProductService()
