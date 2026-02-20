import type { FastifyReply } from 'fastify'

import { getErrorMessage, getErrorStatusCode, ValidationError, ZodValidationError } from './errors'

const handleRoutesError = (error: unknown, reply: FastifyReply) => {
	const statusCode = getErrorStatusCode(error)
	const message = getErrorMessage(error)

	if (error instanceof ZodValidationError && Object.keys(error.fieldErrors).length > 0) {
		return reply.code(statusCode).send({
			error: {
				statusCode,
				message,
				fields: error.fieldErrors,
			},
		})
	}

	if (error instanceof ValidationError && Object.keys(error.fieldErrors).length > 0) {
		return reply.code(statusCode).send({
			error: {
				statusCode,
				message,
				fields: error.fieldErrors,
			},
		})
	}

	return reply.code(statusCode).send({
		error: {
			statusCode,
			message,
		},
	})
}

export default handleRoutesError
