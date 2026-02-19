import pool from "./database"

const products = [
	{
		name: "Laptop",
		description: "111 High-performance laptop for professionals",
		price: 1299.99,
		quantity: 5,
	},
	{
		name: "Wireless Mouse",
		description: "Ergonomic wireless mouse with long battery life",
		price: 49.99,
		quantity: 20,
	},
	{
		name: "USB-C Cable",
		description: "Fast charging USB-C cable 2 meters",
		price: 19.99,
		quantity: 50,
	},
]

async function seed() {
	try {
		console.log("Starting database seed...")

		// Clear existing data
		await pool.query("TRUNCATE products CASCADE")
		console.log("✓ Cleared existing products")

		// Insert seed data
		for (const product of products) {
			await pool.query(
				"INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4)",
				[product.name, product.description, product.price, product.quantity]
			)
		}

		console.log(`✓ Inserted ${products.length} products`)
		console.log("✓ Database seed completed successfully")

		process.exit(0)
	} catch (error) {
		console.error("Error seeding database:", error)
		process.exit(1)
	}
}

seed()
