import userRepository from 'repositories/userRepository'
import { sendMagicLinkEmail } from 'services/emailService'
import { generateMagicLinkToken, generateAuthToken, verifyMagicLinkToken } from 'utils/token'
import type { ISendMagicLinkInput } from 'schemas/schema'
import type { IUser } from 'schemas/schema'
import { UnauthorizedError } from 'utils/errors'

const sendMagicLink = async (params: ISendMagicLinkInput, baseUrl: string): Promise<void> => {
	const { email, firstName, lastName } = params
	const isRegistration = firstName && lastName

	let user = await userRepository.getByEmail(email)

	if (!user && isRegistration) {
		user = await userRepository.create({
			email,
			firstName,
			lastName,
		})
	}

	const token = generateMagicLinkToken(email)

	await sendMagicLinkEmail(email, token, baseUrl)
}

const verifyMagicLink = async (magicToken: string): Promise<IUser> => {
	const payload = verifyMagicLinkToken(magicToken)

	const user = await userRepository.getByEmail(payload.email)

	if (!user) {
		throw new UnauthorizedError('User not found')
	}

	const { token, expiresAt } = generateAuthToken(user.id, user.email)

	const updatedUser = await userRepository.updateToken(user.id, token, expiresAt)

	if (!updatedUser) {
		throw new UnauthorizedError('Failed to update user token')
	}

	return updatedUser
}

const getUserById = async (id: string): Promise<IUser | null> => {
	return userRepository.getById(id)
}

const getUserByEmail = async (email: string): Promise<IUser | null> => {
	return userRepository.getByEmail(email)
}

export default {
	sendMagicLink,
	verifyMagicLink,
	getUserById,
	getUserByEmail,
}
