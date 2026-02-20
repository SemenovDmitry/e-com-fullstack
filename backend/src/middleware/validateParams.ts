import type { FastifyRequest, FastifyReply } from 'fastify'
import { ZodType, ZodError } from 'zod'
import { ZodValidationError } from 'utils/errors'
import handleRoutesError from 'utils/handleRoutesError'

export const zodValidationMiddleware = (schema: ZodType, validate: 'body' | 'query' | 'params') => {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			schema.parse(request[validate])
		} catch (error) {
			if (error instanceof ZodError) {
				const validationError = new ZodValidationError(error)
				return handleRoutesError(validationError, reply)
			}
			return handleRoutesError(error, reply)
		}
	}
}
