import type { FastifyRequest } from "fastify"
import type { IUser } from "schemas/schema"

const getRequestUser = (request: FastifyRequest): IUser => {
  return (request as any).user
}

export default getRequestUser
