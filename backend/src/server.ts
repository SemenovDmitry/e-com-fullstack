import Fastify from 'fastify'

import { productRoutes } from 'routes/productRoutes'
import { userRoutes } from 'routes/userRoutes'

const fastify = Fastify({ logger: true })

// Регистрация routes
fastify.register(productRoutes)
fastify.register(userRoutes)

// Запуск сервера
const start = async () => {
	try {
		await fastify.listen({ port: 3000, host: '0.0.0.0' })
		console.log('✅ Сервер запущен на http://localhost:3000')
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

start()
