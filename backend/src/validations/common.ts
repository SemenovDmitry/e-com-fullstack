import { z } from 'zod'

export const uuidSchema = z.uuid('Wrong ID format').min(1, 'ID is required')

export const idParamsSchema = z.object({
	id: uuidSchema,
})
