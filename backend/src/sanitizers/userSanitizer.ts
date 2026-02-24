import type { IUser } from 'schemas/schema'

export const userResponseSanitizer = (data: IUser): Omit<IUser, 'token'> => {
	const { token, ...sanitized } = data
	return sanitized as Omit<IUser, 'token'>
}
