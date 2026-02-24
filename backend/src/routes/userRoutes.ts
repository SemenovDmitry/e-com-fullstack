import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { userResponseSanitizer } from 'sanitizers/userSanitizer'
import handleRoutesError from 'utils/handleRoutesError'
import { zodValidationMiddleware } from 'middleware/validateParams'
import { authenticateUser } from 'middleware/authenticate'
import { sendMagicLinkSchema, type ISendMagicLinkInput } from 'schemas/schema'
import userService from 'services/userService'
import getRequestUser from 'utils/getRequestUser'

export async function userRoutes(fastify: FastifyInstance) {
	// POST /auth/send-link - Send magic link (authentication or registration)
	fastify.post('/auth/send-link', {
		preHandler: [zodValidationMiddleware(sendMagicLinkSchema, 'body')],
		handler: async (request: FastifyRequest, reply: FastifyReply) => {
			try {
				const { email } = request.body as ISendMagicLinkInput
				const baseUrl = `${request.protocol}://${request.hostname}`

				await userService.sendMagicLink(request.body as ISendMagicLinkInput, baseUrl)

				return reply.code(200).send({
					message: 'Magic link sent to your email',
					email,
				})
			} catch (error) {
				return handleRoutesError(error, reply)
			}
		},
	})

	// GET /auth/verify - Verify magic link token
	fastify.get('/auth/verify', {
		handler: async (request: FastifyRequest, reply: FastifyReply) => {
			try {
				const { token } = request.query as { token?: string }

				if (!token) {
					return reply.code(400).send({ message: 'Token is required' })
				}

				const user = await userService.verifyMagicLink(token)
				console.log('user :>> ', user);
				const sanitizedUser = userResponseSanitizer(user)

				return reply
					.header(
						'Set-Cookie',
						`authorization=Bearer ${user.token}; Path=/; HttpOnly; Secure; SameSite=Strict`
					)
					.code(200)
					.send({
						message: 'Email verified successfully',
						user: sanitizedUser,
					})
			} catch (error) {
				return handleRoutesError(error, reply)
			}
		},
	})

	// GET /me - Get current user by token (protected route)
	fastify.get('/me', {
		preHandler: [authenticateUser],
		handler: async (request: FastifyRequest, reply: FastifyReply) => {
			try {
				const user = getRequestUser(request)
				const sanitizedUser = userResponseSanitizer(user)
				return reply.code(200).send(sanitizedUser)
			} catch (error) {
				return handleRoutesError(error, reply)
			}
		},
	})
}
