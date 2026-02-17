import type {
  CreateProductDto,
  IProduct,
  UpdateProductDto,
} from "types/product.js"
import uuid from "utils/uuid.js"

class ProductRepository {
  private products: IProduct[] = [
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

  findAll(): IProduct[] {
    return this.products
  }

  findById(id: string): IProduct | null {
    return this.products.find((p) => p.id === id) || null
  }

  create(data: CreateProductDto): IProduct {
    const product: IProduct = {
      id: uuid(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.products.push(product)
    return product
  }

  update(id: string, data: UpdateProductDto): IProduct | null {
    const product = this.findById(id)
    if (!product) return null

    Object.assign(product, data, { updatedAt: new Date() })
    return product
  }

  delete(id: string): boolean {
    const index = this.products.findIndex((p) => p.id === id)
    if (index === -1) return false
    this.products.splice(index, 1)
    return true
  }
}

export const productRepository = new ProductRepository()
