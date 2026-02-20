import { z } from 'zod'

export const createProductSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().optional().default(''),
	price: z.number().min(0, 'Price cannot be negative'),
	quantity: z.number().int().min(0, 'Quantity cannot be negative'),
})

export const updateProductSchema = createProductSchema.partial()

export type ICreateProductInput = z.infer<typeof createProductSchema>
export type IUpdateProductInput = z.infer<typeof updateProductSchema>
