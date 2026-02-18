import Fastify from "fastify"

import { productRoutes } from "routes/productRoutes.js"

const fastify = Fastify({ logger: true })

// Регистрация routes
fastify.register(productRoutes)

// Запуск сервера
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" })
    console.log("✅ Сервер запущен на http://localhost:3000")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
