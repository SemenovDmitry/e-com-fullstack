import type { FastifyRequest, FastifyReply } from 'fastify'
import { verifyAuthToken } from 'utils/token'
import userService from 'services/userService'
import { UnauthorizedError } from 'utils/errors'
import handleRoutesError from 'utils/handleRoutesError'

export const authenticateUser = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const authHeader = request.headers.authorization

		if (!authHeader?.startsWith('Bearer ')) {
			throw new UnauthorizedError('No authentication token provided')
		}

		const token = authHeader.slice(7)

		const payload = verifyAuthToken(token)
		const user = await userService.getUserById(payload.id)

		if (!user) {
			throw new UnauthorizedError('User not found')
		}

		// Attach user data to request
		;(request as any).userId = user.id
		;(request as any).user = user
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			return handleRoutesError(error, reply)
		}
		return handleRoutesError(new UnauthorizedError('Invalid or expired token'), reply)
	}
}
