import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const MAGIC_LINK_EXPIRY_MINUTES = 30
const AUTH_TOKEN_EXPIRY_DAYS = 30

type MagicLinkPayload = {
	email: string
	iat?: number
	exp?: number
}

type AuthTokenPayload = {
	id: string
	email: string
	iat?: number
	exp?: number
}

const generateMagicLinkToken = (email: string): string => {
	const payload: MagicLinkPayload = {
		email,
	}

	return jwt.sign(payload, JWT_SECRET, {
		expiresIn: `${MAGIC_LINK_EXPIRY_MINUTES}m`,
	})
}

const generateAuthToken = (id: string, email: string): { token: string; expiresAt: Date } => {
	const payload: AuthTokenPayload = {
		id,
		email,
	}

	const token = jwt.sign(payload, JWT_SECRET, {
		expiresIn: `${AUTH_TOKEN_EXPIRY_DAYS}d`,
	})

	// Calculate exact expiry date based on JWT
	const expiresAt = new Date()
	expiresAt.setTime(expiresAt.getTime() + AUTH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000)

	return { token, expiresAt }
}

const verifyMagicLinkToken = (token: string): MagicLinkPayload => {
	try {
		return jwt.verify(token, JWT_SECRET) as MagicLinkPayload
	} catch (error) {
		throw new Error('Invalid or expired token')
	}
}

const verifyAuthToken = (token: string): AuthTokenPayload => {
	try {
		return jwt.verify(token, JWT_SECRET) as AuthTokenPayload
	} catch (error) {
		throw new Error('Invalid or expired auth token')
	}
}

export {
	generateMagicLinkToken,
	generateAuthToken,
	verifyMagicLinkToken,
	verifyAuthToken,
}
